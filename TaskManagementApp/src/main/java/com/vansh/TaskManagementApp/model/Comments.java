package com.vansh.TaskManagementApp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String comment;

    private LocalDateTime expireTime;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_name", referencedColumnName = "taskName")
    private Tasks tasks;
}
