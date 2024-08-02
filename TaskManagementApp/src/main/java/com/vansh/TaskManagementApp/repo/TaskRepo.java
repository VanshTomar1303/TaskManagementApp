package com.vansh.TaskManagementApp.repo;

import com.vansh.TaskManagementApp.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepo extends JpaRepository<Tasks,Long> {
    List<Tasks> findByProgrammingLanguageContaining(String programmingLanguage);
    Optional<Tasks> findByTaskName(String taskName);
}
