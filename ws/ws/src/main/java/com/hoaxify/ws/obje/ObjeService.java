package com.hoaxify.ws.obje;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<Obje> getObjes(Pageable page) {
        return objeRepository.findAll(page);
    }

    public void save(Obje obje, User user) {
        obje.setTimestamp(new Date());
        obje.setUser(user);
        objeRepository.save(obje);
    }

    public Page<Obje>  getObjesOfUser(String username, Pageable page) {
        User inDB = userService.getByUsername(username);
        return objeRepository.findByUser(inDB,page);
    }

    public Page<Obje> getOldObjes(long id, Pageable page) {
        return objeRepository.findByIdLessThan(id,page);
    }


    public Page<Obje> getOldObjesOfUser(long id, String username, Pageable page) {
        User inDB = userService.getByUsername(username);
        return objeRepository.findByIdLessThanAndUser(id, inDB, page);
    }

    public long getNewObjesCount(long id) {
        return objeRepository.countByIdGreaterThan(id);
    }

    public long getNewObjesCountOfUser(long id, String username) {
        User inDB = userService.getByUsername(username);
        return objeRepository.countByIdGreaterThanAndUser(id,inDB);
    }

    public List<Obje> getNewObjes(long id, Sort sort) {
        return objeRepository.findByIdGreaterThan(id, sort);
    }

    public List<Obje> getNewObjesOfUser(long id, String username, Sort sort) {
        User inDB = userService.getByUsername(username);
        return objeRepository.findByIdGreaterThanAndUser(id,inDB,sort);
    }
}
