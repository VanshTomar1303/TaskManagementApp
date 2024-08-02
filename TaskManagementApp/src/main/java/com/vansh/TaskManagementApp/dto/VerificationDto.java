package com.vansh.TaskManagementApp.dto;

import lombok.Data;

@Data
public class VerificationDto {
    private String email;
    private String verificationCode;
}
