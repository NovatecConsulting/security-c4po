package dm.securitytestingguideapi.controller;

import io.restassured.RestAssured;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@AutoConfigureMockMvc
//@AutoConfigureTestDatabase
public class SecurityTestControllerTest {

    @LocalServerPort
    private int port;

    @Before
    public void setUp() throws Exception {
        RestAssured.port = port;
    }

    // TODO: replace with Service instead of direct call to Repository
//    @Autowired
//    SecurityTestRepository repository;

//    @Autowired
//    private MockMvc mvc;

    @Test
    public void getAllTests_thenStatus200_AndJsonSizeIs90() {
        RestAssured.get("/api/v1/tests").then().assertThat().body("size()", Matchers.is(90))
        .and().assertThat().statusCode(200);
    }

    @Test
    public void getTestsByCategory_INFO_thenStatus200_AndJsonSizeIs10() {
        RestAssured.get("/api/v1/tests?category=INFO").then().assertThat().body("size()", Matchers.is(10))
        .and().assertThat().statusCode(200);
    }

    @Test
    public void getTestById_thenStatus200_AndTitleAsExpected() {
        RestAssured.get("/api/v1/tests/OTG-AUTHN-002").then().assertThat().body("title", Matchers.equalTo("Testing for default credentials"))
        .and().assertThat().statusCode(200);
    }

}