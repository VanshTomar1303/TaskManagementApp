package com.vansh.TaskManagementApp.service;


import com.vansh.TaskManagementApp.dto.RegisterUserDto;
import com.vansh.TaskManagementApp.model.User;
import com.vansh.TaskManagementApp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    //get All users
    public List<RegisterUserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        List<RegisterUserDto> dtoList = users.stream()
                .map(this::convertToDto) // Assuming you have a method to convert User to RegisterUserDto
                .collect(Collectors.toList());
        return dtoList;
    }

    // update user details
    public RegisterUserDto updateUserRole(String email, RegisterUserDto user){
        try{
            Optional<User> optionalUser = userRepo.findByEmail(email);
            if(optionalUser.isPresent()){
                User existingUser = optionalUser.get();
                existingUser.setRole(user.getRole());
                existingUser.setEmail(user.getEmail());
                existingUser.setUsername(user.getUsername());
                existingUser.setDesc(user.getDesc());
                existingUser.setProgrammingLanguages(user.getProgrammingLanguage());

                User ourUser = userRepo.save(existingUser);
            }else{
                throw new RuntimeException("Error in changing role of user");
            }
                return  user;
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }
    // delete a user
    public void deleteUser(String email){
        try {
            Optional<User> userOptional = userRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                userRepo.deleteById(user.getId());
            } else {
                throw new RuntimeException("Error in deleting user");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    //get user by id
    public RegisterUserDto getUsersByEmail(String email) {
        RegisterUserDto dto = new RegisterUserDto();
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User Not found"));
        dto.setDesc(user.getDesc());
        dto.setRole(user.getRole());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setProgrammingLanguage(user.getProgrammingLanguages());
        System.out.println("working");
        return dto;
    }
    //get user by programming language
    public List<RegisterUserDto> getUsersByPL(String programmingLanguage) {
        System.out.println("Working");
        List<User> usersByPL = userRepo.findByProgrammingLanguagesContaining(programmingLanguage);
        List<RegisterUserDto> dtoList = usersByPL.stream()
                .map(this::convertToDto) // Assuming you have a method to convert User to RegisterUserDto
                .collect(Collectors.toList());
        return dtoList;
    }

    private RegisterUserDto convertToDto(User user) {
        RegisterUserDto dto = new RegisterUserDto();
        dto.setUsername(user.getUsername());
        dto.setDesc(user.getDesc());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setProgrammingLanguage(user.getProgrammingLanguages());
        return dto;
    }


    public RegisterUserDto getCurrentUserProfile() {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new UsernameNotFoundException("User not authenticated");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername(); // or getEmail() if you store emails

        // Retrieve user entity from the database
        Optional<User> userOptional = userRepo.findByUsername(username);
        if(userOptional.isPresent()){
            User user = userOptional.get();
        return convertToDto(user);
        }
        else{
            throw new UsernameNotFoundException("User not found");
        }

    }

}
