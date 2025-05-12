package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Task createTask(Task task) {
        task.setCreatedOn(LocalDateTime.now());
        return repo.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = repo.findById(id).orElseThrow();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setStatus(taskDetails.getStatus());
        task.setRemarks(taskDetails.getRemarks());
        task.setUpdatedOn(LocalDateTime.now());
        task.setUpdatedByName(taskDetails.getUpdatedByName());
        task.setUpdatedById(taskDetails.getUpdatedById());
        return repo.save(task);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public List<Task> searchByTitle(String title) {
        return repo.findByTitleContainingIgnoreCase(title);
    }
}
