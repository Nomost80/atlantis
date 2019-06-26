package exakis.atlantis.admin;

import org.springframework.boot.SpringApplication;
		import org.springframework.boot.autoconfigure.SpringBootApplication;
		import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
		import org.springframework.boot.autoconfigure.domain.EntityScan;
		import org.springframework.context.annotation.ComponentScan;
		import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
		import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
//@EnableAutoConfiguration
//@ComponentScan(basePackages={"exakis.atlantis.admin"})
@EnableJpaRepositories(basePackages="exakis.atlantis.admin")
@EnableTransactionManagement
@EntityScan(basePackages="exakis.atlantis.admin")

public class AdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminApplication.class, args);
	}

}
