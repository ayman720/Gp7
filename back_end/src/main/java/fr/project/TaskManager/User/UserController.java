package fr.project.TaskManager.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;



    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Boolean checkUser(@RequestParam String mail,  @RequestParam String password){

        return userService.checkUser(mail,password);

    }

    @GetMapping("/all")
    public List<User> getUsers(@RequestParam(required = false) String email){

        return userService.getUsers(email);

    }

    @PostMapping
    public void registerNewUser(@RequestBody User user){
        userService.addUser(user);

    }


/*
    @PostMapping(path="{projectId}")
    public void addNewTask(
            @PathVariable("projectId") Long projectId,
            @RequestBody User user) {
        userService.addTask(projectId,user);

    }*/

/*
    @PutMapping(path="{taskId}")
    public void changeTask(
            @PathVariable("taskId") Long taskId,
            @RequestParam Task.Status status
    ){
        userService.modifierStatus(userId,status);
    }*/


}
