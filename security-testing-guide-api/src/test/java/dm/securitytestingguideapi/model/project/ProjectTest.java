package dm.securitytestingguideapi.model.project;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.containsString;

@RunWith(SpringJUnit4ClassRunner.class)
public class ProjectTest {

    @Test
    public void givenBidirectionalRelation_whenUsingJacksonReferenceAnnotation_thenCorrect() throws JsonProcessingException {
        Project project = new Project();
        String result = new ObjectMapper().writeValueAsString(project);
        assertThat(result, containsString("selectedLogoTester"));
    }

}
