package com.vansh.TaskManagementApp.service;

import com.vansh.TaskManagementApp.dto.LoginUserDto;
import com.vansh.TaskManagementApp.dto.RegisterUserDto;
import com.vansh.TaskManagementApp.dto.VerificationDto;
import com.vansh.TaskManagementApp.model.User;
import com.vansh.TaskManagementApp.repo.UserRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailService emailService;

    public User signUp(RegisterUserDto input){
        User user = new User();
        user.setUsername(input.getUsername());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(input.getRole());
        user.setProgrammingLanguages(input.getProgrammingLanguage());
        user.setDesc(input.getDesc());
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
        user.setEnabled(false);

        sendVerificationEmail(user);

        return userRepo.save(user);
    }

    public User authenticate(LoginUserDto input){
        User user = userRepo.findByEmail(input.getEmail())
                .orElseThrow(()->new RuntimeException("User not found"));

        if(!user.isEnabled()){
            throw new RuntimeException("Account not verified");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }

    public void verifyUser(VerificationDto input){
        Optional<User> optionalUser = userRepo.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
                throw new RuntimeException("Verification code has expired");
            }
            if(user.getVerificationCode().equals(input.getVerificationCode())){
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepo.save(user);
            }else{
                throw  new RuntimeException("Invalid verification Code");
            }
        }else{
            throw  new RuntimeException("User not found");
        }
    }

    public void resendCode(String email){
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.isEnabled()){
                throw new RuntimeException("Account is verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
            sendVerificationEmail(user);
            userRepo.save(user);
        }else{
            throw  new RuntimeException("User not found");
        }

    }

    public void sendVerificationEmail(User user) {
        String subject ="Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000)+100000;
        return String.valueOf(code);
    }
}
