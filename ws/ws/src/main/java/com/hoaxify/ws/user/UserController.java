package com.hoaxify.ws.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.shared.Views;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin //CORS hatası alamanı engelliyor
//CrossOrigin ayarını kaldırdık çünkü react içinde proxy ayarı olarak 8080 i tanıttık (package.json)
@RestController
public class UserController {
    @Autowired
    UserService userService;

    //gelen requestin valid olması gerektiğini @valid ile gösteriyouz
    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User created.");
    }

    @GetMapping("/api/1.0/users")
    @JsonView(Views.Base.class)
    Page<User> getUsers(Pageable page){
        return userService.getUsers(page);
    }



}
