package simple.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller // Web Template(View) Return
public class FirstController {

    @RequestMapping(value = "/first-url", method = RequestMethod.GET)
    public void first() {

    }

    @ResponseBody
    @RequestMapping(value = "/hello-world", method = RequestMethod.GET)
    public String helloWorld() {
        return "hello world";
    }
}