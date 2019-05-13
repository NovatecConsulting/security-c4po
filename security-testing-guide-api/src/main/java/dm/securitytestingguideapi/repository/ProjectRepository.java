package dm.securitytestingguideapi.repository;

import dm.securitytestingguideapi.model.project.Project;
import dm.securitytestingguideapi.model.project.ProjectWithDetailsProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, UUID> {

//    Iterable<Project> findAllBy(Pageable pageable);

    @Query("SELECT * FROM project WHERE id = :id")
    Project findAllById(UUID id);

    @Query("SELECT * FROM project")
//    @Query("SELECT project.id AS id, project.client AS client, project.title AS title, project.created_at AS created_at FROM project WHERE project.id = ?")
    List<Project> findAllBy(Pageable pageable);

    @Query("SELECT * FROM PROJECT")
    List<ProjectWithDetailsProjection> findAllBy();

}
