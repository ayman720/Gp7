package fr.project.TaskManager.Task;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.project.TaskManager.Projects.Project;
import fr.project.TaskManager.User.User;


import javax.persistence.*;
import java.util.Optional;


@Entity
@Table
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    // Nom de la tâche

    @Column
    private String name;
    // Description de la tâche
    private String description;
    // type Staatus qui regroupe les différents statuts possibles
    public enum Status {
        TODO, IN_PROGRESS, DONE
    }
    // Statut de la tâche
    private Status TaskStatus;
    // note de la tâche
    private int Mark;




   @ManyToOne
    @JoinColumn(name="projectId")
   private Project project;


   @ManyToOne
   private User user;

    public Task() {
    }

    public Task(String name, String description, Status taskStatus, int mark ) {
        this.name = name;
        this.description = description;
        TaskStatus = taskStatus;
        Mark = mark;


    }

    public Task(Long id, String name, String description, Status taskStatus, int mark ) {
        this.id = id;
        this.name = name;
        this.description = description;
        TaskStatus = taskStatus;
        Mark = mark;


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

    public Status getTaskStatus() {
        return TaskStatus;
    }

    public void setTaskStatus(Status taskStatus) {
        TaskStatus = taskStatus;
    }

    public int getMark() {
        return Mark;
    }

    public void setMark(int mark) {
        Mark = mark;
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
      this.user = user;
    }

    @Override
    public String toString() {

        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", TaskStatus=" + TaskStatus +
                ", Mark=" + Mark +
                '}';
    }
}
