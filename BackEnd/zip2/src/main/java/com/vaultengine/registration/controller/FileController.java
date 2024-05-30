package com.vaultengine.registration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.vaultengine.registration.bean.FileMetadataDTO;
import com.vaultengine.registration.service.FileService;

import jakarta.servlet.http.HttpSession;

import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId) {
    	System.out.println("hello-----------------------");
        return fileService.saveFile(file, userId);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        return fileService.getFile(id);
    }

    @GetMapping("/user/{userId}/files")
    public ResponseEntity<List<FileMetadataDTO>> getFilesForUser(@PathVariable Long userId) {
        return fileService.getFilesForUser(userId);
    }

    @GetMapping("/list")
    public ResponseEntity<List<FileMetadataDTO>> getAllFiles() {
        return fileService.getAllFiles();
    }

    @GetMapping("/user/{userId}/userspecific")
    public ResponseEntity<List<Long>> getFileIdsByUserId(@PathVariable Long userId) {
        return fileService.getFileIdsByUserId(userId);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        return fileService.deleteFile(id);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        return fileService.logout(session);
    }
}


