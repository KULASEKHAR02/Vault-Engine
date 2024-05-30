package com.vaultengine.registration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaultengine.registration.bean.MyFile;



public interface FileRepository extends JpaRepository<MyFile, Long> {
	 List<MyFile> findByUserId(Long userId);
}
