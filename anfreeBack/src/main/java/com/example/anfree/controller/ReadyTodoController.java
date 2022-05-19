package com.example.anfree.controller;

import com.example.anfree.domain.Member;
import com.example.anfree.domain.ReadyTodoElement;
import com.example.anfree.service.MemberService;
import com.example.anfree.service.ReadyTodoElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


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
                .setMemberId(findMember.getMemberId());

        return RETS.insertReadyTodoElement(insetRTE);
    }

    @PostMapping("/insertJsonRTE")
    public String insertJsonRTE(
            @RequestBody List<ReadyTodoElement> data
    ){
        Date date = new Date();
        for( ReadyTodoElement insertElement : data){
            Member findMember = memberService.findMember(insertElement.getEmail()).get();
            ReadyTodoElement insertRTE = new ReadyTodoElement()
                    .setTodoElement(insertElement.getTodoElement())
                    .setEmail(insertElement.getEmail())
                    .setMemberId(findMember.getMemberId())
                    .setDate(date);
            RETS.insertReadyTodoElement(insertRTE);
            System.out.println(insertRTE.toString());
        }
        return data.toString();
    }

//    @GetMapping("/findRTE")
//    public String findAllRTE(
//            @RequestParam(value = "email") String email
//    ){
//        List<ReadyTodoElement> retList =  memberService.findAllRTE(email);
//        return retList.toString();
//    }
}
