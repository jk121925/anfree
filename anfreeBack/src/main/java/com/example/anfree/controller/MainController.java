package com.example.anfree.controller;

import com.example.anfree.domain.Member;
import com.example.anfree.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private static final String template = "Fuck you, %s,%s,%s,%s!";

    @Autowired
    private final MemberService memberService;

    public MainController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/join")
    public String joining(
        @RequestParam(value = "name") String name
        ,@RequestParam(value = "email") String email
        ,@RequestParam(value = "password") String password
        ,@RequestParam(value = "sex") String sex){
        Member fuck =new Member(name, email,password,sex);
        memberService.joinMember(fuck);
        return String.format(template,fuck.getEmail(),fuck.getName(),fuck.getPassword(),fuck.getSex());
    }

//    @GetMapping("/greeting")
//    public Greeting greeting(@RequestParam(value = "name", defaultValue ="World") String name){
//        return new Greeting(counter.incrementAndGet(), String.format(template,name));
//    }
}
