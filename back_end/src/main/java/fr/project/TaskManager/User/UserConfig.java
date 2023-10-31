package fr.project.TaskManager.User;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {



    @Bean("User")
    CommandLineRunner commandLineRunner(UserRepository repository){

        return args -> {




            // User user1 = new User("badr","bbenfedd@enseeiht.com","1234", User.Role.STUDENT);

            // User user2 = new User("aymane","amounir@enseeiht.com","Mounir12345&", User.Role.STUDENT);

          // repository.saveAll(List.of(user1,user2));

        };


    }
}
