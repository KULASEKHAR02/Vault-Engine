package com.vaultengine.registration.client;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.vaultengine.registration.bean.User;

@FeignClient(name = "SERVICE1")
public interface UserServiceClient {
    @GetMapping("/api/users/{id}")
    ResponseEntity<User> getUserById(@PathVariable("id") Long id);
}

