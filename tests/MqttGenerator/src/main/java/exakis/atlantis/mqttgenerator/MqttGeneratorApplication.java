package exakis.atlantis.mqttgenerator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@SpringBootApplication
@Component
public class MqttGeneratorApplication implements CommandLineRunner {
	private Generator generator;

	public MqttGeneratorApplication(Generator generator) {
		this.generator = generator;
	}

	public static void main(String[] args) {
		SpringApplication.run(MqttGeneratorApplication.class, args);
	}

	@Override
	public void run(String... args) {
		this.generator.run(50);
	}
}
