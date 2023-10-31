package fr.project.TaskManager.Task;

import fr.project.TaskManager.Projects.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;



    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks(){

        return taskService.getTasks();

    }




    @PostMapping(path="{projectId}/{userId}")
    public void addNewTask(
            @PathVariable("projectId") Long projectId,
            @PathVariable("userId") Long userId,
            @RequestBody Task task) {
        taskService.addTask(projectId,userId,task);

    }


    @PutMapping(path="{taskId}")
    public void changeTask(
            @PathVariable("taskId") Long taskId,
            @RequestParam Task.Status status
    ){
        taskService.modifierTask(taskId,status);
    }


    @DeleteMapping(path="{taskId}")
    public void addNewTask(
            @PathVariable("taskId") Long taskId) {
        taskService.deleteTask(taskId);

    }


}
