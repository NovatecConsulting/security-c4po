package dm.securitytestingguideapi.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Project implements Serializable {

    @Id
    private UUID id;

    @NotBlank
    private String client;

    @NotBlank
    private String title;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "dd MMM yyyy - HH:mm:ss", timezone = "CET")
    @CreatedDate
    Instant createdAt;

    private String testerName;

    private String selectedLogoTester;

    private int selectedLogoClient;

    public Project() {
        this.createdAt = LocalDateTime.now().toInstant(ZoneId.of("Europe/Berlin").getRules().getOffset(LocalDateTime.now()));
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", client='" + client + '\'' +
                ", title='" + title + '\'' +
                ", createdAt=" + createdAt +
                ", testerName='" + testerName + '\'' +
                ", selectedLogoTester=" + selectedLogoTester +
                ", selectedLogoClient=" + selectedLogoClient +
                '}';
    }

}
