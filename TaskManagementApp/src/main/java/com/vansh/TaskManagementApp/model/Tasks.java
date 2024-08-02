package com.vansh.TaskManagementApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String taskName;
    @Column(length = 10000)
    private String taskDesc;
    private String status;// incomplete or complete
    private String workedBy;//username whose working on this task
    private String timeToDoTask;

    @OneToMany(mappedBy = "tasks")
    private List<Comments> comments;

    @ElementCollection
    @CollectionTable(name = "task_programming_languages", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "programming_language",nullable = false)
    private List<String> programmingLanguage;
}
