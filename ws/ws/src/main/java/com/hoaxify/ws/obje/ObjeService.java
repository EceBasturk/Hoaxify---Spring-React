package com.hoaxify.ws.obje;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.file.FileAttachmentRepository;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.obje.vm.ObjeSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.DoubleStream;

@Service
public class ObjeService {

    ObjeRepository objeRepository;
    UserService userService;

    FileAttachmentRepository fileAttachmentRepository;

    public ObjeService(ObjeRepository objeRepository, FileAttachmentRepository fileAttachmentRepository) {
        super();
        this.objeRepository = objeRepository;
        this.fileAttachmentRepository = fileAttachmentRepository;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void save(ObjeSubmitVM objeSubmitVM, User user) {
        Obje obje = new Obje();
        obje.setContent(objeSubmitVM.getContent());
        obje.setTimestamp(new Date());
        obje.setUser(user);
        objeRepository.save(obje);
        Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(objeSubmitVM.getAttachmentId());
        if (optionalFileAttachment.isPresent()) {
            FileAttachment fileAttachment = optionalFileAttachment.get();
            fileAttachment.setObje(obje);
            fileAttachmentRepository.save(fileAttachment);
        }
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

    public void delete(long id) {
        objeRepository.deleteById(id);
    }


    public void deleteObjesOfUser(String username) {
        User inDB = userService.getByUsername(username);
        Specification<Obje> userOwned = userIs(inDB);
        List<Obje> objesToBeRemoved = objeRepository.findAll(userOwned);
        objeRepository.deleteAll(objesToBeRemoved);
    }
}

