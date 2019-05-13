package dm.securitytestingguideapi.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
import java.util.UUID;

@Projection(name = "projectWithoutResults", types = { Project.class })
public interface ProjectWithoutResultsProjection {

    UUID getId();
    String getClient();
    String getTitle();

    @JsonFormat(pattern="dd MMM yyyy - HH:mm:ss")
    LocalDateTime getCreated();

}
