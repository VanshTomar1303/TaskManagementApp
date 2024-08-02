package com.vansh.TaskManagementApp.repo;

import com.vansh.TaskManagementApp.model.Comments;
import com.vansh.TaskManagementApp.model.Tasks;
import com.vansh.TaskManagementApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepo extends JpaRepository<Comments, Long> {

    // Find all comments by a specific user
    List<Comments> findByUser(User user);

    // Find all comments related to a specific task
    List<Comments> findByTasks(Tasks tasks);

    Optional<Comments> findByUserAndTasks(User user, Tasks tasks);

    // Find comments that have expired based on the current time
    List<Comments> findByExpireTimeBefore(LocalDateTime now);

}

