package dm.securitytestingguideapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    @PostMapping(produces = "application/json")
    @ResponseBody
    public String hardcodedUser() {
        log.info("Returning hardcoded User (user, TESTER, s0m3-f4k3-jwt-t0k3n) ...");
        return "{\"username\": \"user\", \"role\": \"TESTER\", \"token\": \"s0m3-f4k3-jwt-t0k3n\"}";
    }

}

