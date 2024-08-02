package com.vansh.TaskManagementApp.dto;

import lombok.Data;

@Data
public class CommentDto {
    private String comment;
    private String userEmail;
    private String taskName;

    private int StatusCode;
    private String message;

}
