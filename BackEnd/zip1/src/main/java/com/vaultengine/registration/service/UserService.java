package com.vaultengine.registration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vaultengine.registration.bean.User;
import com.vaultengine.registration.bean.UserLoginResponseDTO;
import com.vaultengine.registration.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<String> registerUser(User user) {
        if (emailExists(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User email already exists in the database");
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    public Optional<User> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user; 
        
    }
    
    public ResponseEntity<UserLoginResponseDTO> loginUser(User loginUser) {
        User user = findByEmail(loginUser.getEmail());
        if (user != null && passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            UserLoginResponseDTO responseDTO = new UserLoginResponseDTO(user.getId(), user.getUsername());
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    private User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}



