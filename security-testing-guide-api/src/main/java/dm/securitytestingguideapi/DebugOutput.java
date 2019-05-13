package dm.securitytestingguideapi;

import dm.securitytestingguideapi.model.SecurityTest;
import dm.securitytestingguideapi.repository.ProjectRepository;
import dm.securitytestingguideapi.repository.SecurityTestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DebugOutput implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SecurityTestRepository securityTestRepository;

    public DebugOutput(ProjectRepository projectRepository, SecurityTestRepository securityTestRepository) {
        this.projectRepository = projectRepository;
        this.securityTestRepository = securityTestRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("### Project Data:");
        projectRepository.findAll().forEach(System.out::println);
        System.out.println("### Security Test Data:");
//        securityTestRepository.findAll().forEach(System.out::println);
        int numSecTests = 0;
        for (SecurityTest securityTest : securityTestRepository.findAll()) {
            numSecTests++;
        }
        System.out.println("### " + numSecTests + " Security Tests in repository.");

    }
}
