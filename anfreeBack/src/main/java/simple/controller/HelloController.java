package simple.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/")
public class HelloController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String hello() {
        return "SpringBoot Hello World!";
    }
}

