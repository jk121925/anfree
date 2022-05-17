package com.example.anfree.service;

import com.example.anfree.domain.Member;
import com.example.anfree.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    void 회원가입() {
        Member member  = new Member().setEmail("bell1902@naver.com").setName("jk").setPassword("1111").setSex("M");

        String savedEmail = memberService.joinMember(member);
        Member findMember = memberService.findMember(savedEmail).get();
        assertThat(member.getEmail()).isEqualTo(findMember.getEmail());
    }

    @Test
    void 가입확인(){
        Member member  = new Member().setEmail("bell1902@naver.com").setName("jk").setPassword("1111").setSex("M");

        String savedEmail = memberService.joinMember(member);
        Member findMember = memberService.findMember(savedEmail).get();

        assertThat(member.getEmail()).isEqualTo(findMember.getEmail());
        assertThat(member.getName()).isEqualTo(findMember.getName());


    }
}