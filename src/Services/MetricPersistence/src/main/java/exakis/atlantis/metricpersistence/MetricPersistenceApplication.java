package exakis.atlantis.metricpersistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@SpringBootApplication
@EnableJpaRepositories
@Component
public class MetricPersistenceApplication implements CommandLineRunner  {
	@Autowired
	private MetricConsumer metricConsumer;

	public static void main(String[] args) {
		SpringApplication.run(MetricPersistenceApplication.class, args);
	}

	@Override
	public void run(String... args) {
		this.metricConsumer.listen();
		Scanner sc = new Scanner(System.in);
		int i = sc.nextInt();
	}
}
