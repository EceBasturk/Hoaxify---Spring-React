package com.hoaxify.ws.auth;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
@RestController
public class AuthController {

    @Autowired
    AuthService authService;


    @PostMapping("/api/1.0/auth")
    AuthResponse handleAuthentication(@RequestBody Credentials credentials) {
        return authService.authenticate(credentials);
    }
}