package dm.securitytestingguideapi.repository;

import dm.securitytestingguideapi.model.project.Project;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

//@RunWith(SpringRunner.class)
//@DataJdbcTest
@Ignore
public class ProjectRepositoryTest {

    @Autowired
    ProjectRepository projectRepository;

    @Test
    public void saveProject_findById_NotEmpty() {
        Project project = new Project();
        project.setClient("E Corp");
        project.setTitle("FastCash API v2.0");
        Project save = projectRepository.save(project);

        assertThat(save).isNotNull();

        Optional<Project> p = projectRepository.findById(save.getId());

        assertThat(p.isEmpty()).isFalse();
    }

    @Test
    public void saveProject_findAllBy_Pageable() {
        Project project = new Project();
        project.setClient("E Corp");
        project.setTitle("FastCash API v2.0");
        projectRepository.save(project);
        projectRepository.save(new Project());

        assertThat(projectRepository.findAllBy(Pageable.unpaged()).size()).isEqualTo(2);
    }

    @Test
    public void saveProject_findAllBy_withProjection() {
        Project project = new Project();
        project.setClient("E Corp");
        project.setTitle("Projection Scan");
        projectRepository.save(project);

        assertThat(projectRepository.findAllBy().size()).isEqualTo(1);
    }

}
