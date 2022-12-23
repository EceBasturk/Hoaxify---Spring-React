package com.hoaxify.ws.obje;

import com.hoaxify.ws.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service(value = "objeSecurity")
public class ObjeSecurityService {

    @Autowired
    ObjeRepository objeRepository;

    public boolean isAllowedToDelete(long id, User loggedInUser) {
        Optional<Obje> optionalObje = objeRepository.findById(id);
        if(!optionalObje.isPresent()) {
            return false;
        }

        Obje obje = optionalObje.get();
        if(obje.getUser().getId() != loggedInUser.getId()) {
            return false;
        }

        return true;
    }

}