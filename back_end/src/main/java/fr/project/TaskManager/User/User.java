package fr.project.TaskManager.User;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import fr.project.TaskManager.Projects.Project;
import fr.project.TaskManager.Task.Task;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="members")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    // Nom de la tâche
    @Column(name = "user_name", nullable = false)
    private String name;
    // Description de la tâche
    private String email;

    private String password;
    // type Staatus qui regroupe les différents statuts possibles
    public enum Role {
        TEACHER, STUDENT
    }
    // Statut de la tâche
    private Role role;
    // note de la tâche

    @JsonIgnore
   @ManyToMany
    private List<Project> projects;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Task> tasks;

    public User() {
     this.projects = new ArrayList<Project>();
       this.tasks = new ArrayList<Task>();
    }

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
       this.projects = new ArrayList<Project>();
       this.tasks = new ArrayList<Task>();
    }

    public User(Long id, String name, String email, String password, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
       this.projects = new ArrayList<Project>();
       this.tasks = new ArrayList<Task>();
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void addProjects(Project project) {
        this.projects.add(project);
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void addTasks(Task task) {
        this.tasks.add(task);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}
