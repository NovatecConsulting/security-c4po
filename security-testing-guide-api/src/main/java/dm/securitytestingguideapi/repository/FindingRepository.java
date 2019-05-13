package dm.securitytestingguideapi.repository;

import dm.securitytestingguideapi.model.Finding;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface FindingRepository extends CrudRepository<Finding, UUID> {

    List<Finding> findAllByProjectId(UUID projectId);

    @Query("select * from finding where project_id = :projectId and test_id = :testId")
    List<Finding> findAllByProjectIdAndTestId(UUID projectId, String testId);

}
