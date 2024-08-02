package com.vansh.TaskManagementApp.service;

import com.vansh.TaskManagementApp.dto.TaskDto;
import com.vansh.TaskManagementApp.model.Tasks;
import com.vansh.TaskManagementApp.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;

    //get all task
    public List<TaskDto> getAllTask(){
        List<Tasks> tasksList = taskRepo.findAll();
        List<TaskDto> taskDtoList = tasksList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return taskDtoList;
    }

    // convert list of task to a task
    private TaskDto convertToDto(Tasks tasks){
        TaskDto dto = new TaskDto();
        try{
            if(tasks.getTaskName() != null){
                dto.setTaskName(tasks.getTaskName());
                dto.setTaskDesc(tasks.getTaskDesc());
                dto.setProgrammingLanguage(tasks.getProgrammingLanguage());
                dto.setStatus(tasks.getStatus());
                dto.setWorkedBy(tasks.getWorkedBy());
                dto.setTimeToDoTask(tasks.getTimeToDoTask());

                dto.setStatusCode(200);
                dto.setMessage("All tasks are fetched successfully");
            }else{
                dto.setStatusCode(404);
                dto.setMessage("Tasks Not Found");
            }
            return dto;
        }catch(Exception e) {
            dto.setStatusCode(500);
            dto.setMessage(" Error occurred due to : " + e.getMessage());
            return dto;
        }
    }

    //add a task
    public TaskDto addTask(TaskDto dto){
        TaskDto taskDto = new TaskDto();
        try{
            Tasks tasks = new Tasks();
            tasks.setTaskName(dto.getTaskName());
            tasks.setTaskDesc(dto.getTaskDesc());
            tasks.setTimeToDoTask(dto.getTimeToDoTask());
            tasks.setStatus("Incomplete");
            tasks.setWorkedBy("");
            tasks.setProgrammingLanguage(dto.getProgrammingLanguage());
            Tasks savedTask = taskRepo.save(tasks); // Save the task to the repository

            if (savedTask.getId() != null) { // Check if save was successful
                taskDto.setStatusCode(200);
                taskDto.setMessage("Task added successfully");
            } else {
                taskDto.setStatusCode(404);
                taskDto.setMessage("Task not added");
            }
            return taskDto;
        }catch (Exception e){
            dto.setStatusCode(500);
            dto.setMessage(" Error occurred due to : " + e.getMessage());
            return taskDto;
        }
    }

    // Update a task by Admin
    public TaskDto updateByAdminTask(String taskName,TaskDto dto){
        TaskDto taskDto = new TaskDto();
        Optional<Tasks> optionalTasks = taskRepo.findByTaskName(taskName);
        try{
            if(optionalTasks.isPresent()) {
                Tasks tasks = optionalTasks.get();
                tasks.setTaskName(dto.getTaskName());
                tasks.setTaskDesc(dto.getTaskDesc());
                tasks.setTimeToDoTask(dto.getTimeToDoTask());
                tasks.setProgrammingLanguage(dto.getProgrammingLanguage());
                if (tasks.getId() > 0) {
                    taskDto.setStatusCode(200);
                    taskDto.setMessage("Task Updated successfully");
                    taskRepo.save(tasks);
                } else {
                    taskDto.setStatusCode(404);
                    taskDto.setMessage("Task Has Not Been Updated");
                }
            }
            else{
                taskDto.setStatusCode(404);
                taskDto.setMessage("Task Has Not Found");
            }
            return taskDto;
        }catch (Exception e){
            taskDto.setStatusCode(500);
            taskDto.setMessage(" Error occurred due to : " + e.getMessage());
            return taskDto;
        }
    }

    //update task by the user
    public TaskDto updateByUserTask(String taskName,TaskDto dto){
        TaskDto taskDto = new TaskDto();
        Optional<Tasks> optionalTasks = taskRepo.findByTaskName(taskName);
        try{
            if(optionalTasks.isPresent()) {
                Tasks tasks = optionalTasks.get();
                tasks.setStatus(dto.getStatus());
                tasks.setWorkedBy(dto.getWorkedBy());
                if (tasks.getId() > 0) {
                    taskDto.setStatusCode(200);
                    taskDto.setMessage("Task Updated successfully");
                    taskRepo.save(tasks);
                } else {
                    taskDto.setStatusCode(404);
                    taskDto.setMessage("Task Has Not Been Updated");
                }
            }
            else{
                taskDto.setStatusCode(404);
                taskDto.setMessage("Task Has Not Found");
            }
            return taskDto;
        }catch (Exception e){
            taskDto.setStatusCode(500);
            taskDto.setMessage(" Error occurred due to : " + e.getMessage());
            return taskDto;
        }
    }

    //delete a task
    public TaskDto deleteTask(String taskName){
        TaskDto taskDto = new TaskDto();
        try{
            Optional<Tasks> tasksOptional = taskRepo.findByTaskName(taskName);
            if(tasksOptional.isPresent()){
                Tasks tasks = tasksOptional.get();
                taskRepo.deleteById(tasks.getId());
                taskDto.setStatusCode(200);
                taskDto.setMessage("Task Has Been Deleted");
            }else{
                taskDto.setStatusCode(404);
                taskDto.setMessage("Task Has Not Found");
            }
            return taskDto;

        }
        catch(Exception e){
            taskDto.setStatusCode(500);
            taskDto.setMessage(" Error occurred due to : " + e.getMessage());
            return taskDto;
        }
    }

    //get task by programming language
    public List<TaskDto> getTaskByPl(String programmingLanguage){
        List<Tasks> tasksByPL = taskRepo.findByProgrammingLanguageContaining(programmingLanguage);
        List<TaskDto> taskDtoList = tasksByPL.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return taskDtoList;
    }

    //get task by task name
    public TaskDto getTaskByTaskName(String taskName){
        TaskDto taskDto = new TaskDto();
        try{
            Optional<Tasks> optionalTasks = taskRepo.findByTaskName(taskName);
            if(optionalTasks.isPresent()){
                Tasks tasks = optionalTasks.get();
                taskDto.setTaskName(tasks.getTaskName());
                taskDto.setTaskDesc(tasks.getTaskDesc());
                taskDto.setProgrammingLanguage(tasks.getProgrammingLanguage());
                taskDto.setStatus(tasks.getStatus());
                taskDto.setWorkedBy(tasks.getWorkedBy());
                taskDto.setTimeToDoTask(tasks.getTimeToDoTask());

                taskDto.setStatusCode(200);
                taskDto.setMessage("All tasks are fetched successfully");

            }else{
                taskDto.setStatusCode(404);
                taskDto.setMessage("Task Has Not Found");
            }
           return taskDto;
        }catch (Exception e){
            taskDto.setStatusCode(500);
            taskDto.setMessage(" Error occurred due to : " + e.getMessage());
            return taskDto;
        }
    }
}
