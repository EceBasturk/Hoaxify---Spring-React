package com.hoaxify.ws.user;

import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin //CORS hatası alamanı engelliyor
//CrossOrigin ayarını kaldırdık çünkü react içinde proxy ayarı olarak 8080 i tanıttık (package.json)
@RestController
public class UserController {
    @Autowired
    UserService userService;

    //post için url
    //gelen requestin valid olması gerektiğini @valid ile gösteriyouz
    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User created.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) //ResponseStatus göndermezsek 200 gönderecektir.
    public ApiError handleValidationException(MethodArgumentNotValidException exception){
        ApiError error = new ApiError(400, "Validation error", "/api/1.0/users");
        Map<String,String> validationErrors = new HashMap<>();
        for(FieldError fieldError: exception.getBindingResult().getFieldErrors()){
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        error.setValidationErrors(validationErrors);
        return error;
    }
}
