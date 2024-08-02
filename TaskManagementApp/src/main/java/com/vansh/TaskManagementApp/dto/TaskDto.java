package com.vansh.TaskManagementApp.dto;


import lombok.Data;

import java.util.List;

@Data
public class TaskDto {
    private String taskName;
    private String taskDesc;
    private String status;// incomplete or complete
    private String workedBy;//username or email whose working on this task
    private String timeToDoTask;
    private List<String> programmingLanguage;

    private int statusCode;
    private String message;
}
