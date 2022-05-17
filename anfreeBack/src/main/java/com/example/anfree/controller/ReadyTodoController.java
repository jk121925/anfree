package com.example.anfree.controller;

import com.example.anfree.domain.Member;
import com.example.anfree.domain.ReadyTodoElement;
import com.example.anfree.service.MemberService;
import com.example.anfree.service.ReadyTodoElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ReadyTodoController {

    @Autowired
    private final ReadyTodoElementService RETS;
    @Autowired
    private final MemberService memberService;

    public ReadyTodoController(ReadyTodoElementService RETS, MemberService memberService) {
        this.RETS = RETS; this.memberService = memberService;
    }

    @GetMapping("/insertRTE")
    public String insertRTE(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "todoElement") String todoElement
    ){
        Member findMember = memberService.findMember(email).get();

        ReadyTodoElement insetRTE = new ReadyTodoElement()
                .setTodoElement(todoElement)
                .setEmail(email)
                .setUserId(findMember.getId());

        return RETS.insertReadyTodoElement(insetRTE);

    }

}
