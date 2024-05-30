package com.vaultengine.registration.bean;



public class FileMetadataDTO {
 private Long id;
 private String filename;
 private Long userId;

 public FileMetadataDTO(Long id, String filename, Long userId) {
     this.id = id;
     this.filename = filename;
     this.userId = userId;
 }

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

public Long getUserId() {
	return userId;
}

public void setUserId(Long userId) {
	this.userId = userId;
}




}
