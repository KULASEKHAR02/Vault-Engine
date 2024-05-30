package com.vaultengine.registration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vaultengine.registration.bean.FileMetadataDTO;
import com.vaultengine.registration.bean.MyFile;
import com.vaultengine.registration.bean.User;
import com.vaultengine.registration.repository.FileRepository;
import com.vaultengine.registration.client.UserServiceClient;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpSession;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private UserServiceClient userServiceClient;

    public ResponseEntity<String> saveFile(MultipartFile file, Long userId) {
        ResponseEntity<User> userResponse = userServiceClient.getUserById(userId);
        if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody() == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        System.out.println("hello -----------------1");
        User user = userResponse.getBody();

        try {
        	System.out.println("hello -----------------2");
            MyFile fileEntity = new MyFile();
            fileEntity.setFilename(file.getOriginalFilename());
            fileEntity.setData(file.getBytes());
            fileEntity.setUser(user);
            MyFile savedFile = fileRepository.save(fileEntity);
            return ResponseEntity.ok("File uploaded successfully: " + savedFile.getId());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    public ResponseEntity<byte[]> getFile(Long id) {
        Optional<MyFile> fileEntityOptional = fileRepository.findById(id);
        if (fileEntityOptional.isPresent()) {
            MyFile fileEntity = fileEntityOptional.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFilename() + "\"")
                    .body(fileEntity.getData());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    public ResponseEntity<List<FileMetadataDTO>> getFilesForUser(Long userId) {
        List<MyFile> files = fileRepository.findByUserId(userId);
        List<FileMetadataDTO> fileMetadata = files.stream()
                .map(file -> new FileMetadataDTO(file.getId(), file.getFilename(), file.getUser().getId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(fileMetadata);
    }

    public ResponseEntity<List<FileMetadataDTO>> getAllFiles() {
        List<MyFile> files = fileRepository.findAll();
        List<FileMetadataDTO> fileMetadata = files.stream()
                .map(file -> new FileMetadataDTO(file.getId(), file.getFilename(), file.getUser().getId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(fileMetadata);
    }

    public ResponseEntity<List<Long>> getFileIdsByUserId(Long userId) {
        List<MyFile> files = fileRepository.findByUserId(userId);
        List<Long> fileIds = files.stream().map(MyFile::getId).collect(Collectors.toList());
        return ResponseEntity.ok(fileIds);
    }

    public ResponseEntity<String> deleteFile(Long id) {
        Optional<MyFile> fileEntityOptional = fileRepository.findById(id);
        if (fileEntityOptional.isPresent()) {
            fileRepository.deleteById(id);
            return ResponseEntity.ok("File deleted successfully");
        } else {
            return ResponseEntity.status(404).body("File not found");
        }
    }

    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
}

