package dm.securitytestingguideapi.model.project;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "projectWithDetails", types = { Project.class })
public interface ProjectWithDetailsProjection {

    Long getId();
    String getClient();
    String getTitle();

//    @JsonFormat(pattern="dd MMM yyyy - HH:mm:ss")
//    LocalDateTime getCreated();

}
