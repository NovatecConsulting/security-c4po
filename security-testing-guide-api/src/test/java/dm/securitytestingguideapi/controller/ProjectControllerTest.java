package dm.securitytestingguideapi.controller;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProjectControllerTest {

    @LocalServerPort
    private int port;

    @Before
    public void setUp() throws Exception {
        RestAssured.port = port;
    }

    @Test
    public void getAllProjects_thenStatus200() {
        RestAssured.get("/api/v1/projects").then().assertThat().statusCode(200);
    }

    @Test
    public void createProject_thenStatus200() {
        Map<String, Object> projectAsMap = new HashMap<>();
        projectAsMap.put("client", "E Corp");
        projectAsMap.put("title", "API (v2.3) Scan");

        given().
                contentType(ContentType.JSON).
                body(projectAsMap).
                log().all().
        when().
                post("/api/v1/projects").
        then().
                log().all().
                assertThat().body("client", Matchers.equalTo("E Corp")).
        and().
                statusCode(200);
    }

    @Test
    public void createInvalidProject_thenStatus400() {
        given().
                contentType(ContentType.JSON).
                body("{ \"client\": \"\"}").
        when().
                post("/api/v1/projects").
        then().
                statusCode(400);
    }

}