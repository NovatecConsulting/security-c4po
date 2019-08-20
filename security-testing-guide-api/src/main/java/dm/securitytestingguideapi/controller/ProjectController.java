package dm.securitytestingguideapi.controller;

import dm.securitytestingguideapi.model.TestStatus;
import dm.securitytestingguideapi.model.project.Project;
import dm.securitytestingguideapi.model.project.ProjectUpdateDTO;
import dm.securitytestingguideapi.repository.ProjectRepository;
import dm.securitytestingguideapi.repository.SecurityTestRepository;
import dm.securitytestingguideapi.repository.TestStatusRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private static final Logger log = LoggerFactory.getLogger(ProjectController.class);

    private final ProjectRepository projectRepository;
    private final TestStatusRepository testStatusRepository;
    private final SecurityTestRepository securityTestRepository;

    @GetMapping("")
    @ResponseBody
    public List<Project> getAllProjects() {
        log.info("Returning all projects ...");
        return projectRepository.findAllBy(Pageable.unpaged());
    }

    @PostMapping("")
    public Project newProject(@RequestBody @Valid Project project) {
        log.info("[+] Creating new project: \"{} : {}\"", project.getClient(), project.getTitle());
        log.info(project.toString());
        return projectRepository.save(project);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity getProjectById(@PathVariable("projectId") UUID projectId) {
        log.info("Returning project {} ...", projectId);

        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    @PatchMapping("/{projectId}")
    public Project updateProjectById(@PathVariable("projectId") UUID projectId, @RequestBody @Valid ProjectUpdateDTO projectUpdate) {
        log.info("Updating project {} ... Body: {}", projectId, projectUpdate.toString());

        Project project = projectRepository.findById(projectId).get();

        log.info("{}", project.toString());

        if (projectUpdate.getClient() != null) {
            project.setClient(projectUpdate.getClient());
        }

        if (projectUpdate.getTitle() != null) {
            project.setTitle(projectUpdate.getTitle());
        }

        if (projectUpdate.getSelectedLogoTester() != null) {
            project.setSelectedLogoTester(projectUpdate.getSelectedLogoTester());
        }

        if (projectUpdate.getLogoClient() != null) {
            project.setLogoClient(projectUpdate.getLogoClient());
        }

        log.info("{}", project.toString());

        return projectRepository.save(project);
    }

    @DeleteMapping(value = "/{projectId}")
    public ResponseEntity deleteProject(@PathVariable("projectId") UUID projectId) {
        projectRepository.deleteById(projectId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/{projectId}/status/{testId}")
    public TestStatus addSecurityTestPerformedToProject(
            @RequestBody TestStatus body,
            @PathVariable("projectId") UUID projectId,
            @PathVariable("testId") String testId
    ) {
        log.info("[+] Adding status to test {} in project {}: {}", testId, projectId, body.toString());

        var project = projectRepository.findById(projectId).orElseThrow();
        var test = securityTestRepository.findById(testId).orElseThrow();

        var newStatus = TestStatus.of(project, test);
        newStatus.setTestProgress(body.getTestProgress());

        return testStatusRepository.save(newStatus);
    }

    @GetMapping(value = "/{projectId}/status")
    public Collection<TestStatus> getAllStatus(@PathVariable("projectId") UUID projectId) {
        log.info("Returning all statuses of project {}", projectId);
        return testStatusRepository.findAllByProjectId(projectId);
    }

    @GetMapping(value = "/{projectId}/status/{testId}")
    public Collection<TestStatus> getAllStatusForTestId(@PathVariable("projectId") UUID projectId, @PathVariable("testId") String testId) {
        log.info("Returning all statuses of {} of project {} ...", testId, projectId);
        return testStatusRepository.findAllByProjectIdAndTestId(projectId, testId);
    }

    @DeleteMapping(value = "/{projectId}/status/{statusId}")
    public ResponseEntity deleteResultFromProject(@PathVariable("projectId") UUID projectId, @PathVariable("statusId") UUID statusId) {
        log.info("[-] Deleting status {} from project {}", statusId, projectId);
        testStatusRepository.deleteById(statusId);
        return ResponseEntity.ok().build();
    }

    /*@PutMapping(value = "/{projectId}/status/{statusId}")
    public ResponseEntity updateResultFromProject(@PathVariable("projectId") Long projectId, @PathVariable("statusId") UUID statusId, HttpEntity<String> httpEntity) {
        log.info("[*] Updating status {} from project {}", statusId, projectId);
        TestStatus testStatus = testStatusRepository.findById(statusId).get();
        try {
            Map map = new ObjectMapper().readValue(httpEntity.getBody(), Map.class);
            testStatus.setTestProgress(TestProgress.valueOf((String) map.get("status")));
        } catch (IOException e) {
            e.printStackTrace();
        }
        testStatusRepository.save(testStatus);
        return ResponseEntity.noContent().build();
    }*/



}
