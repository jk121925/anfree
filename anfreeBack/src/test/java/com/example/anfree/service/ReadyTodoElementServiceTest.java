package com.example.anfree.service;

import com.example.anfree.domain.Member;
import com.example.anfree.domain.ReadyTodoElement;
import com.example.anfree.repository.MemberRepository;
import com.example.anfree.repository.ReadyTodoElementRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.sql.Date;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ReadyTodoElementServiceTest {

    @Autowired ReadyTodoElementService RTES;
    @Autowired ReadyTodoElementRepository RTERepo;
    @Autowired MemberRepository memberRepository;
    @Autowired MemberService memberService;


    @Test
    void todo삽입() {
        Member member  = new Member().setEmail("bell1902@naver.com").setName("jk").setPassword("9999").setSex("M");
        String savedEmail = memberService.joinMember(member);
        Member findMember = memberService.findMember(savedEmail).get();

        ReadyTodoElement rte = new ReadyTodoElement()
                .setTodoElement("testDB")
                .setEmail(findMember.getEmail())
                .setMemberId(findMember.getMemberId());

        String savedTodoElement = RTES.insertReadyTodoElement(rte);
        ReadyTodoElement findRTE = RTES.findRTE("testDB", findMember.getEmail()).get();

        assertThat(findRTE.getTodoElement()).isEqualTo(rte.getTodoElement());
    }

    @Test
    void todo찾기() {
    }
}