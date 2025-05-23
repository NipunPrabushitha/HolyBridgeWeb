package lk.ijse.holybridge;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "lk.ijse.holybridge.repo")
@EntityScan(basePackages = "lk.ijse.holybridge.entity")
@SpringBootApplication
public class HolyBridgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(HolyBridgeApplication.class, args);
    }
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}



//http://localhost:8080/api/v1/user/register