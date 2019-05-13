package dm.securitytestingguideapi.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class SecurityTest {

    @Id
    private String id;

    private String category;

    private String title;

    private String description;

    private String link;

    // DEFAULT CONSTRUCTOR NEEDED FOR CRUD REPOSITORY
    public SecurityTest() { }

    public SecurityTest(String category, String title, String id, String description, String link) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.link = link;
    }

}
