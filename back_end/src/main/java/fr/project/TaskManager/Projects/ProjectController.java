package fr.project.TaskManager.Projects;

import fr.project.TaskManager.Task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;


    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getProjects(){

        return projectService.getProjects();

    }

    @PostMapping
    public void registerNewProject(@RequestBody Project project, @RequestParam String email){
        projectService.addNewProject(project, email);

    }

    @PutMapping(path = "/{projectId}/{userId}")
    public void addUser(
            @PathVariable("userId") Long userId,
            @PathVariable("projectId") Long projectId){
        projectService.addUser(projectId,userId);
    }

/*
    @PutMapping(path = "{projectId}")
    public void addTask(
            @PathVariable("projectId") Long projectId,
            @RequestParam( required = false) String projectName){
        projectService.addNewTask(projectId,projectName);
    }*/
}
