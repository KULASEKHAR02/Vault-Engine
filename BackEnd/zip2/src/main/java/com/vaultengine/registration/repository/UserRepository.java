package com.vaultengine.registration.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vaultengine.registration.bean.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmail(String email);

}







