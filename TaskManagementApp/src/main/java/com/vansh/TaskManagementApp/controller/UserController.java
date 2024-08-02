package com.vansh.TaskManagementApp.controller;

import com.vansh.TaskManagementApp.dto.RegisterUserDto;
import com.vansh.TaskManagementApp.dto.TaskDto;
import com.vansh.TaskManagementApp.service.TaskService;
import com.vansh.TaskManagementApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/userProfile")
    public ResponseEntity<RegisterUserDto> getUserProfile() {
        // Retrieve the current user or a user based get user profile
        RegisterUserDto userProfile = userService.getCurrentUserProfile();

        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/updateTask/{taskName}")
    public ResponseEntity<TaskDto> updateSomeTaskDetails(@PathVariable String taskName,@RequestBody TaskDto taskDto){
        return  ResponseEntity.ok(taskService.updateByUserTask(taskName,taskDto));
    }
}
