package com.hoaxify.ws.user;

import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.obje.ObjeService;
import com.hoaxify.ws.user.vm.UserUpdateVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public class UserService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    FileService fileService;

    ObjeService objeService;

    //constructor injection
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    //setter injection
    @Autowired
    public void setObjeService(ObjeService objeService){
        this.objeService = objeService;
    }

    public void save(User user){
        user.setPassword(this.passwordEncoder.encode((user.getPassword())));
        userRepository.save(user);
    }

    public Page<User> getUsers(Pageable page, User user) {
        if(user != null) {
            return userRepository.findByUsernameNot(user.getUsername(), page);
        }
        return userRepository.findAll(page);
    }

    public User getByUsername(String username) {
        User inDB = userRepository.findByUsername(username);
        if(inDB == null) {
            throw new NotFoundException();
        }
        return inDB;
    }

    public User updateUser(String username, UserUpdateVM updatedUser) {
        User inDB = getByUsername(username);
        inDB.setDisplayName(updatedUser.getDisplayName());
        if(updatedUser.getImage() != null){
            try {
                String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
                inDB.setImage(storedFileName);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return userRepository.save(inDB);
    }

    public void deleteUser(String username) {
        objeService.deleteObjesOfUser(username);;
        userRepository.deleteByUsername(username);
    }
}
