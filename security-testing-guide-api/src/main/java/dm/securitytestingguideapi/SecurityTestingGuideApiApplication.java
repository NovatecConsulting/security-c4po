package dm.securitytestingguideapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableJdbcRepositories
public class SecurityTestingGuideApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityTestingGuideApiApplication.class, args);
	}
}
