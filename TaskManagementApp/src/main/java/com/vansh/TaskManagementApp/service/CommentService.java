package com.vansh.TaskManagementApp.service;

import com.vansh.TaskManagementApp.dto.CommentDto;
import com.vansh.TaskManagementApp.model.Comments;
import com.vansh.TaskManagementApp.model.Tasks;
import com.vansh.TaskManagementApp.model.User;
import com.vansh.TaskManagementApp.repo.TaskRepo;
import com.vansh.TaskManagementApp.repo.UserRepo;
import com.vansh.TaskManagementApp.repo.CommentRepo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TaskRepo taskRepo;

    // Get all comments
    public List<CommentDto> getAllComments() {
        List<Comments> commentsList = commentRepo.findAll();
        return commentsList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Convert Comments entity to CommentDto
    private CommentDto convertToDto(Comments comment) {
        CommentDto dto = new CommentDto();
        try {
            if (comment != null) {
                dto.setComment(comment.getComment()); // Assuming there's a getComment() method
                dto.setUserEmail(comment.getUser().getEmail()); // Assuming there's a getUser() method in Comments
                dto.setTaskName(comment.getTasks().getTaskName());
                dto.setStatusCode(200);
                dto.setMessage("Comment fetched successfully");
            } else {
                dto.setStatusCode(404);
                dto.setMessage("Comment Not Found");
            }
        } catch (Exception e) {
            dto.setStatusCode(500);
            dto.setMessage("Error occurred: " + e.getMessage());
        }
        return dto;
    }

    // Get All Comment By Task
    public List<CommentDto> getCommentByTaskName(String taskName){
        Tasks tasks = taskRepo.findByTaskName(taskName)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        List<Comments> commentsList = commentRepo.findByTasks(tasks);
        return commentsList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    //create a comment
    public CommentDto addComment(CommentDto commentDto){
        CommentDto dto = new CommentDto();
        try {
           Comments comments = new Comments();
            User user = userRepo.findByEmail(commentDto.getUserEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Tasks tasks = taskRepo.findByTaskName(commentDto.getTaskName())
                            .orElseThrow(() -> new RuntimeException("Task not found"));

           comments.setComment(commentDto.getComment());
           comments.setUser(user);
           comments.setTasks(tasks);
           comments.setExpireTime(LocalDateTime.now().plusDays(7));

           Comments savedComment = commentRepo.save(comments);

            if (savedComment.getId() != null) { // Check if save was successful
                dto.setStatusCode(200);
                dto.setMessage("Task added successfully");
            } else {
                dto.setStatusCode(404);
                dto.setMessage("Task not added");
            }
            return dto;

        }catch (Exception e){
            dto.setStatusCode(500);
            dto.setMessage("Error occurred: " + e.getMessage());
        }
        return dto;
    }

    //delete comment by userEmail not used
    public CommentDto deleteComment(String userEmail) {
        CommentDto dto = new CommentDto();
        try {
            Optional<User> userOptional = userRepo.findByEmail(userEmail);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                List<Comments> commentsList = commentRepo.findByUser(user);
                if (commentsList != null && !commentsList.isEmpty()) {
                    for (Comments comment : commentsList) {
                        commentRepo.deleteById(comment.getId());
                    }
                    dto.setStatusCode(200);
                    dto.setMessage("Comments have been deleted");
                } else {
                    dto.setStatusCode(404);
                    dto.setMessage("No comments found for the user");
                }
            } else {
                dto.setStatusCode(404);
                dto.setMessage("User not found");
            }
        } catch (Exception e) {
            dto.setStatusCode(500);
            dto.setMessage("Error occurred: " + e.getMessage());
        }
        return dto;
    }


    //update task not used
    public CommentDto updateComment(String email, CommentDto commentDto) {
        CommentDto dto = new CommentDto();
        try {
            // Find the user by email
            User user = userRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Find the task by task name from the DTO
            Tasks tasks = taskRepo.findByTaskName(commentDto.getTaskName())
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            // Find the comment by user and task
            Optional<Comments> optionalComments = commentRepo.findByUserAndTasks(user, tasks);
            if (optionalComments.isPresent()) {
                Comments comments = optionalComments.get();

                // Update the comment details
                comments.setComment(commentDto.getComment());

                // Save the updated comment
                Comments savedComment = commentRepo.save(comments);

                // Check if the save was successful
                if (savedComment.getId() != null) {
                    dto.setStatusCode(200);
                    dto.setMessage("Comment updated successfully");
                } else {
                    dto.setStatusCode(500);
                    dto.setMessage("Failed to update comment");
                }
            } else {
                dto.setStatusCode(404);
                dto.setMessage("Comment not found for the specified user and task");
            }
        } catch (Exception e) {
            dto.setStatusCode(500);
            dto.setMessage("Error occurred: " + e.getMessage());
        }
        return dto;
    }





    // Automatically Deleted by expire time

    // Retrieve comments that have expired
    public List<Comments> getExpiredComments() {
        LocalDateTime now = LocalDateTime.now();
        return commentRepo.findByExpireTimeBefore(now);
    }

    // Delete expired comments (cleanup)
    /*
        0 -> second
        0 -> minute
        6 -> hours
        * -> day of month
        * -> day of week
        ? -> specific time
     */
    @Scheduled(cron = "0 0 6 * * ?")
    public void deleteExpiredComments() {
        List<Comments> expiredComments = getExpiredComments();
        commentRepo.deleteAll(expiredComments);
    }
}
