package fr.project.TaskManager.User;


import fr.project.TaskManager.Projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service

public class UserService {

    public final UserRepository userRepository;
    public final ProjectRepository projectRepository;

    @Autowired
    public UserService(UserRepository userRepository, ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }



    public Boolean checkUser(String mail,String password){
        List<User> Users = userRepository.findAll();

        for(User user: Users){
            if(user.getEmail().equals(mail) && user.getPassword().equals(password)){
                return true;
            }
        }
        return false;
    }


    public List<User> getUsers(String email) {
        if (email == null) {
            return userRepository.findAll();
        }
        List<User> users = userRepository.findAll();
        for (User user: users){
            if (user.getEmail().equals(email)){
                return List.of(user);
            }
        }
        return null;

    }

    public void addUser(User user) {
        userRepository.save(user);
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
/*
    public void addUser(Long projectId, User task) {
        Project project = projectRepository.findById(projectId).orElseThrow();

        task.setProject(project);

        taskRepository.save(task);

    }*/
/*
    public void modifierTask(Long taskId, Task.Status status) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setTaskStatus(status);
        taskRepository.save(task);

    }*/
}
