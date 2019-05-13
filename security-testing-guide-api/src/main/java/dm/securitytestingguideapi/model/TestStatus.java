package dm.securitytestingguideapi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import dm.securitytestingguideapi.model.project.Project;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@ToString(exclude = {""})
public class TestStatus {

    @Id
    private UUID id;

    private UUID projectId;

    private String testId;

    private TestProgress testProgress;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonFormat(pattern="dd MMM yyyy - HH:mm:ss")
    private LocalDateTime created;

    public static TestStatus of(Project project, SecurityTest securityTest) {
        var testStatus = new TestStatus();
        testStatus.projectId = project.getId();
        testStatus.testId = securityTest.getId();
        testStatus.testProgress = TestProgress.OPEN;
        testStatus.created = LocalDateTime.now();
        return testStatus;
    }

}
