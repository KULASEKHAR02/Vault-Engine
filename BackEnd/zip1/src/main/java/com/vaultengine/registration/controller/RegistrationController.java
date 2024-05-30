package com.vaultengine.registration.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vaultengine.registration.bean.User;
import com.vaultengine.registration.bean.UserLoginResponseDTO;
import com.vaultengine.registration.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
    	Optional<User> user=userService.getUserById(id);
//    	System.out.println("Hello-------------------------");
        return user.isPresent()?ResponseEntity.status(HttpStatus.OK).body(user.get()):ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> loginUser(@RequestBody User loginUser) {
        return userService.loginUser(loginUser);
    }
}


