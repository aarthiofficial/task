package com.example.taskmanager.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate dueDate;
    private String status;
    private String remarks;

    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;

    private String createdByName;
    private String createdById;
    private String updatedByName;
    private String updatedById;

    // Getters and Setters omitted for brevity
}
