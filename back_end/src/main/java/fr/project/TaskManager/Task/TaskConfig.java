package fr.project.TaskManager.Task;


import fr.project.TaskManager.Projects.Project;
import fr.project.TaskManager.Projects.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class TaskConfig {



    @Bean("Task")
    CommandLineRunner commandLineRunner(TaskRepository repository){

        return args -> {




            // Task task1 = new Task("Task 1","Task 1 Description", Task.Status.TODO,1);

            // Task task2 = new Task("Task 2","Task 2 Description", Task.Status.TODO,1);

           // repository.saveAll(List.of(task1,task2));
            
        };


    }
}
