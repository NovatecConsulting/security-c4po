package dm.securitytestingguideapi.repository;

import dm.securitytestingguideapi.model.TestStatus;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface TestStatusRepository extends CrudRepository<TestStatus, UUID> {

    @Query("select * from test_status where project_id = :projectId")
    List<TestStatus> findAllByProjectId(UUID projectId);

    @Query("select * from test_status where project_id = :projectId and test_id = :testId")
    List<TestStatus> findAllByProjectIdAndTestId(UUID projectId, String testId);

}
