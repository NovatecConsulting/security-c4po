package dm.securitytestingguideapi.controller;

import dm.securitytestingguideapi.model.Finding;
import dm.securitytestingguideapi.repository.FindingRepository;
import dm.securitytestingguideapi.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class FindingController {

    private static final Logger log = LoggerFactory.getLogger(FindingController.class);

    private final ProjectRepository projectRepository;
    private final FindingRepository findingRepository;

    @GetMapping(value = "/{projectId}/findings")
    public List<Finding> getAllFindingsInProject(@PathVariable("projectId") UUID projectId) {
        log.info("Getting all findings in project {}", projectId);
        return findingRepository.findAllByProjectId(projectId);
    }

    @PostMapping("/{projectId}/findings")
    public Finding addFindingToProject(@RequestBody Finding body, @PathVariable("projectId") UUID projectId) {
        log.info("[+] Adding finding to project {} : {}", projectId, body.toString());

        var project = projectRepository.findById(projectId).orElseThrow();
        var newFinding = Finding.of(project);
        newFinding.setTestId(body.getTestId());
        newFinding.setTitle(body.getTitle());
        newFinding.setSeverity(body.getSeverity());
        newFinding.setDescription(body.getDescription());

        return findingRepository.save(newFinding);
    }

    @PatchMapping("/{projectId}/findings/{findingId}")
    public Finding updateFinding(
            @RequestBody Finding body,
            @PathVariable("projectId") UUID projectId,
            @PathVariable("findingId") UUID findingId
    ) {
        log.info("[+] Updating finding {} in project {}: {}", findingId, projectId, body.toString());
        var project = projectRepository.findById(projectId).orElseThrow();
        var finding = findingRepository.findById(findingId).get();
        finding.setTitle(body.getTitle());
        finding.setSeverity(body.getSeverity());
        finding.setDescription(body.getDescription());
        finding.setReproduction(body.getReproduction());
        finding.setImpact(body.getImpact());
        finding.setMitigation(body.getMitigation());
        finding.setAffectedUrls(body.getAffectedUrls());
        return findingRepository.save(finding);
    }

    @DeleteMapping("/{projectId}/findings/{findingId}")
    public ResponseEntity deleteFinding(@PathVariable("projectId") UUID projectId, @PathVariable("findingId") UUID findingId) {
        log.info("[-] Removing finding {}", findingId);
        findingRepository.deleteById(findingId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{projectId}/findings/{testId}")
    public List<Finding> getAllFindingsInProjectByTest(@PathVariable("projectId") UUID projectId, @PathVariable("testId") String testId) {
        log.info("Returning all findings for {} in project {} ...", testId, projectId);
        return findingRepository.findAllByProjectIdAndTestId(projectId, testId);
    }

}
