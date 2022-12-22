package com.hoaxify.ws.obje;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.DoubleStream;

@Service
public class ObjeService {

    ObjeRepository objeRepository;
    UserService userService;

    public ObjeService(ObjeRepository objeRepository, UserService userService) {
        super();
        this.objeRepository = objeRepository;
        this.userService = userService;
    }

    public void save(Obje obje, User user) {
        obje.setTimestamp(new Date());
        obje.setUser(user);
        objeRepository.save(obje);
    }
    public Page<Obje> getObjes(Pageable page) {
        return objeRepository.findAll(page);
    }

    public Page<Obje> getObjesOfUser(String username, Pageable page) {
        User inDB = userService.getByUsername(username);
        return objeRepository.findByUser(inDB,page);
    }

    public Page<Obje> getOldObjes(long id, String username, Pageable page) {
        Specification<Obje> specification = idLessThan(id);
        if(username != null) {
            User inDB = userService.getByUsername(username);
            specification = specification.and(userIs(inDB));
        }
        return objeRepository.findAll(specification, page);
    }

    public long getNewObjesCount(long id, String username) {
        Specification<Obje> specification = idGreaterThan(id);
        if(username != null) {
            User inDB = userService.getByUsername(username);
            specification = specification.and(userIs(inDB));
        }
        return objeRepository.count(specification);
    }

    public List<Obje> getNewObjes(long id, String username, Sort sort) {
        Specification<Obje> specification = idGreaterThan(id);
        if(username != null) {
            User inDB = userService.getByUsername(username);
            specification = specification.and(userIs(inDB));
        }
        return objeRepository.findAll(specification, sort);
    }

    Specification<Obje> idLessThan(long id){
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.lessThan(root.get("id"), id);
        };
    }

    Specification<Obje> userIs(User user){
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("user"), user);
        };
    }

    Specification<Obje> idGreaterThan(long id){
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.greaterThan(root.get("id"), id);
        };
    }


}

