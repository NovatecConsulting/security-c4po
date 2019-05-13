package dm.securitytestingguideapi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import dm.securitytestingguideapi.model.project.Project;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class Finding {

    @Id
    private UUID id;

    private UUID projectId;

    private String testId;

    private String title;

    private Severity severity;

    private String description;

    private String reproduction;

    private String impact;

    private String mitigation;

    private String affectedUrls;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonFormat(pattern="dd MMM yyyy - HH:mm:ss")
    private LocalDateTime created;

    public static Finding of(Project project) {
        var finding = new Finding();
        finding.projectId = project.getId();
        finding.created = LocalDateTime.now();
        return finding;
    }

}
