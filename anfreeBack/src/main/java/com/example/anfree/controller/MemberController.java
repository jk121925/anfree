package com.example.anfree.controller;

import com.example.anfree.domain.Member;
import com.example.anfree.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {

    private static final String template = "Fuck you, %s,%s,%s,%s!";

    @Autowired
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/joinMember")
    public String joinMember(
            @RequestParam(value = "name") String name
            ,@RequestParam(value = "email") String email
            ,@RequestParam(value = "password") String password
            ,@RequestParam(value = "sex") String sex){
        Member willJoinMember =new Member(name, email,password,sex);
        memberService.joinMember(willJoinMember);
        return String.format(template,willJoinMember.getEmail(),willJoinMember.getName(),willJoinMember.getPassword(),willJoinMember.getSex());
    }


}
