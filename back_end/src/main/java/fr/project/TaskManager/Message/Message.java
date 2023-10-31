package fr.project.TaskManager.Message;

import fr.project.TaskManager.Task.Task;
import fr.project.TaskManager.User.User;



//@Entity
//@Table
public class Message {
    //@Id
   // @GeneratedValue(strategy = GenerationType.AUTO)


    private Long id;




    private String msg;


    //@ManyToOne
    private User user;


    //@ManyToOne
    private Task task;

    public Message() {
    }

    public Message(String msg, User user, Task task) {
        this.msg = msg;
        this.user = user;
        this.task = task;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}

