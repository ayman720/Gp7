package fr.project.TaskManager.Projects;

//import javax.persistence.*;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.project.TaskManager.Task.Task;
import fr.project.TaskManager.User.User;
//import fr.project.TaskManager.User.User;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Project {
    @Id
    @SequenceGenerator(
            name = "project_sequence",
            sequenceName =  "project_sequence",
            allocationSize =  1
    )
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "project_sequence"
    )
    @Column(name="projectId")
    private Long id;
    // Nom du projet

    private String name;
    // Description du projet
    private String description;
    // liste des utilisateurs dans ce projet
    //@ManyToMany(mappedBy = "users")
  //  private String List<String> members;
    // liste des tâches dans ce projet
    //@OneToMany(mappedBy = "task")


    @JsonIgnore
   @OneToMany(mappedBy = "project" )

    private List<Task> tasks;

   // @JsonIgnore

    @ManyToMany(mappedBy = "projects")
    private List<User> users;



    public Project() {

       this.tasks = new ArrayList<Task>();
       this.users = new ArrayList<User>();
    }

    public Project(String name, String description) {
        this.name = name;
        this.description = description;
        this.tasks = new ArrayList<Task>();
        this.users = new ArrayList<User>();
    }

    public Project(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
       this.tasks = new ArrayList<Task>();
       this.users = new ArrayList<User>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public List<Task> getTasks(){return this.tasks;}

    public void addTask(Task task){this.tasks.add(task);}

    public List<User> getUsers(){return this.users;}

    public void addUser(User user){this.users.add(user);}

    @Override
    public String toString() {
        String str =  "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", Tasks ='" ;
        for(Task task: tasks){
            str += " - ";
            str += task.toString();
        }


        str += '\'' +  '}';


        return str;
    }
}
