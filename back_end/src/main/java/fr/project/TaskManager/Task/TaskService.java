package fr.project.TaskManager.Task;


import fr.project.TaskManager.Projects.Project;
import fr.project.TaskManager.Projects.ProjectRepository;
import fr.project.TaskManager.User.User;
import fr.project.TaskManager.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public class TaskService {

    public final TaskRepository taskRepository;
    public final ProjectRepository projectRepository;

    public final UserRepository userRepository;
    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<Task> getTasks() {
       return taskRepository.findAll();

    }
/*
    public void addNewTask(Task task) {

        List<Task> tasks = taskRepository.findAll();

        for(Task atask : tasks){
            if(atask.getName().equals(task.getName())){
                throw new IllegalStateException("Project name already exsit !");

            }
        }


        taskRepository.save(task);

    }*/

    public void addTask(Long projectId,Long userId, Task task) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        task.setProject(project);
        task.setUser(user);
        project.addUser(user);
        taskRepository.save(task);
        projectRepository.save(project);

    }

    public void modifierTask(Long taskId, Task.Status status) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setTaskStatus(status);
        taskRepository.save(task);

    }

    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        taskRepository.delete(task);
    }
}
