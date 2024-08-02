package com.vansh.TaskManagementApp.repo;

import com.vansh.TaskManagementApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    List<User> findByProgrammingLanguagesContaining(String programmingLanguage);
    Optional<User> findByVerificationCode(String verificationCode);
    Optional<User> findByUsername(String usernameOrEmail);
}
