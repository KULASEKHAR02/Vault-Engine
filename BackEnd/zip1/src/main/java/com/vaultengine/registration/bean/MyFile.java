package com.vaultengine.registration.bean;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "my_file_ms")
public class MyFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;

    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;
    
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    
    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

	

	
}
