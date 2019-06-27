package exakis.atlantis.mqttgenerator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MqttGeneratorApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(MqttGeneratorApplication.class, args);
	}

	@Override
	public void run(String... args) {
		Generator.run(50);
	}
}
