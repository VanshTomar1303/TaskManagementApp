package com.vansh.TaskManagementApp.controller;

import com.vansh.TaskManagementApp.dto.CommentDto;
import com.vansh.TaskManagementApp.dto.RegisterUserDto;
import com.vansh.TaskManagementApp.dto.TaskDto;
import com.vansh.TaskManagementApp.model.User;
import com.vansh.TaskManagementApp.service.CommentService;
import com.vansh.TaskManagementApp.service.TaskService;
import com.vansh.TaskManagementApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/admin")
@RestController
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @GetMapping("/getAllUser")
    public ResponseEntity<List<RegisterUserDto>> getAllUser(){
        List<RegisterUserDto> users = userService.getAllUsers();
        System.out.println("Users retrieved: " + users.size()); // Log the number of users
        return ResponseEntity.ok(users);
    }


    @PutMapping("/updateUser/{email}")
    public ResponseEntity<RegisterUserDto> updateUser(@PathVariable String email,@RequestBody RegisterUserDto user){
        return ResponseEntity.ok(userService.updateUserRole(email,user));
    }

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<RegisterUserDto> getByEmail(@PathVariable String email){
        System.out.println("working");
        return ResponseEntity.ok(userService.getUsersByEmail(email));
    }

    @DeleteMapping("/deleteUser/{email}")
    public void deleteUser(@PathVariable String email){
        userService.deleteUser(email);
    }

    @GetMapping("/getByPL/{keyword}")
    public ResponseEntity<List<RegisterUserDto>> getUserByPL(@PathVariable String keyword){
        return  ResponseEntity.ok(userService.getUsersByPL(keyword));
    }

    @GetMapping("/profile")
    public ResponseEntity<RegisterUserDto> adminProfile(){
        RegisterUserDto userProfile = userService.getCurrentUserProfile();

        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Task Management
    @PostMapping("/addTask")
    public ResponseEntity<TaskDto> addTasks(@RequestBody TaskDto taskDto){
        return ResponseEntity.ok(taskService.addTask(taskDto));
    }
    @PutMapping("/updateTask/{taskName}")
    public ResponseEntity<TaskDto> updateTasks(@PathVariable String taskName,@RequestBody TaskDto taskDto){
        return ResponseEntity.ok(taskService.updateByAdminTask(taskName,taskDto));
    }
    @DeleteMapping("/deleteTask/{taskName}")
    public ResponseEntity<TaskDto> deleteTasks(@PathVariable String taskName){
        return ResponseEntity.ok(taskService.deleteTask(taskName));
    }


}
