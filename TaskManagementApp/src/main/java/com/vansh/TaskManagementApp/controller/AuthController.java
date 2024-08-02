package com.vansh.TaskManagementApp.controller;

import com.vansh.TaskManagementApp.dto.LoginUserDto;
import com.vansh.TaskManagementApp.dto.RegisterUserDto;
import com.vansh.TaskManagementApp.dto.VerificationDto;
import com.vansh.TaskManagementApp.model.User;
import com.vansh.TaskManagementApp.response.LoginResponse;
import com.vansh.TaskManagementApp.service.AuthService;
import com.vansh.TaskManagementApp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto){
        User registerUser = authService.signUp(registerUserDto);
        return ResponseEntity.ok(registerUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto){
        User authenticateUser=authService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticateUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime(), authenticateUser.getRole());
        System.out.println(authenticateUser.getRole());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerificationDto verificationDto){
        try{
           authService.verifyUser(verificationDto);
           return ResponseEntity.ok("Account Verified Successfully");
        }catch (RuntimeException e){
                return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend-code")
    public ResponseEntity<?> resendVerificationCode(@RequestParam("email") String email){
        try{
            authService.resendCode(email);
            return ResponseEntity.ok("Resend code Successfully");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
