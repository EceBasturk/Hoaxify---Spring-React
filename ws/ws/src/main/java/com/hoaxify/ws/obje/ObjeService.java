package com.hoaxify.ws.obje;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
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
}
