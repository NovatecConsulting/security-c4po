package dm.securitytestingguideapi.config;

import dm.securitytestingguideapi.model.Finding;
import dm.securitytestingguideapi.model.TestStatus;
import dm.securitytestingguideapi.model.project.Project;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jdbc.core.convert.JdbcCustomConversions;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.JdbcConfiguration;
import org.springframework.data.relational.core.mapping.event.BeforeSaveEvent;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.UUID;

@SpringBootConfiguration
@AutoConfigurationPackage
@EnableJdbcAuditing
public class DatabaseConfig extends JdbcConfiguration {

    @Bean
    NamedParameterJdbcOperations operations(DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }

    @Bean
    PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    /*
     * Generates UUID for new projects, testStatus, findings, etc. before saving to database.
     */
    @Bean
    ApplicationListener<BeforeSaveEvent> setIdApplicationListener() {
        return event -> {
            Object entity = event.getEntity();
            if (entity instanceof Project) {
                var project = (Project) entity;
                if (project.getId() == null) {
                    project.setId(UUID.randomUUID());
                }
            } else if (entity instanceof TestStatus) {
                var testStatus = (TestStatus) entity;
                if (testStatus.getId() == null) {
                    testStatus.setId(UUID.randomUUID());
                }
            } else if (entity instanceof Finding) {
                var finding = (Finding) entity;
                if (finding.getId() == null) {
                    finding.setId(UUID.randomUUID());
                }
            }
        };
    }

    /*
     * Allows reading a Clob as a String from the database. There is no default converter for this yet in Data JDBC.
     */
    @Override
    protected JdbcCustomConversions jdbcCustomConversions() {
        return new JdbcCustomConversions(Collections.singletonList(new ClobConverter()));
    }

    @Bean
    DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript("schema.sql")
                .addScript("/sql/security-tests.sql")
                .addScript("/sql/test-data.sql") // TODO: Is not written to database?
                .build();
    }

}
