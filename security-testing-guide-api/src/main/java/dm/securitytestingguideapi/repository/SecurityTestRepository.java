package dm.securitytestingguideapi.repository;

import dm.securitytestingguideapi.model.SecurityTest;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SecurityTestRepository extends CrudRepository<SecurityTest, String> {

    @Query("SELECT * FROM SECURITY_TEST WHERE CATEGORY = :category")
    List<SecurityTest> getAllByCategoryOrderByIdAsc(String category);

    SecurityTest getSecurityTestById(String testNumber);

}
