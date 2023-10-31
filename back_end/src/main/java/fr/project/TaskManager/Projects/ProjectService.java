package fr.project.TaskManager.Projects;

import fr.project.TaskManager.Task.Task;
import fr.project.TaskManager.Task.TaskRepository;
import fr.project.TaskManager.User.User;
import fr.project.TaskManager.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service

public class ProjectService {

    public final ProjectRepository projectRepository;
    public final TaskRepository taskRepository;

    public final UserRepository userRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<Project> getProjects() {
       return projectRepository.findAll();

    }

    public void addNewProject(Project project,String email) {

        List<Project> projects = projectRepository.findAll();
        List<User> users = userRepository.findAll();

        for(User user : users) {
            if (user.getEmail().equals(email)) {
                project.addUser(user);
                user.addProjects(project);
            }
        }

        for(Project projet : projects){
            if(projet.getName().equals(project.getName())){
                throw new IllegalStateException("Project name already exsit !");
                
            }
        }


        projectRepository.save(project);

    }

    public void addUser(Long projectId,Long userId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        project.addUser(user);
        user.addProjects(project);

        projectRepository.save(project);
        userRepository.save(user);

    }

    /*@Transactional
    public void addNewTask(Long projectId, String projectName) {

        List<Task> tasks = taskRepository.findAll();
        Project project = projectRepository.findById(projectId).orElseThrow(
                ()->  new IllegalStateException("Project with Id " + projectId + " does not exist")

        );
        if(projectName != null ){
            project.setName(tasks.get(1).getName());
            //project.addTask(tasks.get(1));
        }







    }*/
}
