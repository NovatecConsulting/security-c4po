package dm.securitytestingguideapi.controller;

import dm.securitytestingguideapi.model.Category;
import dm.securitytestingguideapi.model.CategoryConverter;
import dm.securitytestingguideapi.model.SecurityTest;
import dm.securitytestingguideapi.repository.SecurityTestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tests")
public class SecurityTestController {

    private static final Logger log = LoggerFactory.getLogger(SecurityTestController.class);

    private SecurityTestRepository securityTestRepository;

    @Autowired
    public SecurityTestController(SecurityTestRepository securityTestRepository) {
        this.securityTestRepository = securityTestRepository;
    }

    @GetMapping("")
    @ResponseBody
    public Iterable<SecurityTest> getAllSecurityTestsByCategory(@RequestParam(value = "category", required = false) Category category) {

        if (category != null) {
            String categoryName = category.getFullCategoryName();
            log.info("Returning all security tests in category \"{}\" ...", categoryName);
            return securityTestRepository.getAllByCategoryOrderByIdAsc(categoryName);
        }

        log.info("Returning all {} security tests currently in database ...", securityTestRepository.count());
        return securityTestRepository.findAll();

    }

    @GetMapping(value = "/{testId}", produces = "application/json")
    @ResponseBody
    public SecurityTest getSecurityTestByTestNumber(@PathVariable(value = "testId") String testNumber) {

        SecurityTest securityTest = securityTestRepository.getSecurityTestById(testNumber);

        log.info("Returning {} ...", securityTest.getId());

        return securityTest;

    }

    /*
    @PatchMapping(value = "/{testId}", consumes = "application/json")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateSecurityTest(@PathVariable(value = "testId") String testNumber, @RequestBody SecurityTest securityTest) throws JsonProcessingException {
        log.info("Updating {} ... {}", testNumber, new ObjectMapper().writeValueAsString(securityTest));
        securityTestRepository.save(securityTest);
    }
    */

    @InitBinder
    public void initBinder(final WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(Category.class, new CategoryConverter());
    }

}

