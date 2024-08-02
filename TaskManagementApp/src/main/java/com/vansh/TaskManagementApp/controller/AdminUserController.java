package com.vansh.TaskManagementApp.controller;


import com.vansh.TaskManagementApp.dto.CommentDto;
import com.vansh.TaskManagementApp.dto.RegisterUserDto;
import com.vansh.TaskManagementApp.dto.TaskDto;
import com.vansh.TaskManagementApp.service.CommentService;
import com.vansh.TaskManagementApp.service.TaskService;
import com.vansh.TaskManagementApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminuser")
public class AdminUserController {
    @Autowired
    private TaskService taskService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;


    @GetMapping("/profile")
    public ResponseEntity<RegisterUserDto> getUserProfile() {
        // Retrieve the current user or a user based get user profile
        RegisterUserDto userProfile = userService.getCurrentUserProfile();

        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/getAllTask")
    public ResponseEntity<List<TaskDto>> getAllTask(){
        return ResponseEntity.ok(taskService.getAllTask());
    }
    @GetMapping("/getTaskByPl/{programmingLanguage}")
    public ResponseEntity<List<TaskDto>> getTaskByPL(@PathVariable String programmingLanguage){
        return ResponseEntity.ok(taskService.getTaskByPl(programmingLanguage));
    }
    @GetMapping("/getByTaskName/{taskName}")
    public ResponseEntity<TaskDto> getByTaskName(@PathVariable String taskName){
        return ResponseEntity.ok(taskService.getTaskByTaskName(taskName));
    }

    //Comments
    @GetMapping("/getAllComment")
    public ResponseEntity<List<CommentDto>> getAllComments(){
        return ResponseEntity.ok(commentService.getAllComments());
    }


    @PostMapping("/addComment")
    public ResponseEntity<CommentDto> addComment(@RequestBody CommentDto commentDto){
        return ResponseEntity.ok(commentService.addComment(commentDto));
    }

    @GetMapping("/getAllCommentByTask/{taskName}")
    public ResponseEntity<List<CommentDto>> getAllCommentByTaskName(@PathVariable String taskName){
        return ResponseEntity.ok(commentService.getCommentByTaskName(taskName));
    }
}
