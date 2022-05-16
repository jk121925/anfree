package com.example.anfree.service;

import com.example.anfree.domain.Member;
import com.example.anfree.repository.JpaMemberRepository;
import com.example.anfree.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {


    private final JpaMemberRepository memberRepository;

    @Autowired
    public MemberService(JpaMemberRepository jpaMemberRepository){
        this.memberRepository  = jpaMemberRepository;
    }


    public String joinMember(Member member){

        memberRepository.findByEmail(member.getEmail())
                .ifPresent(m->{
                    throw new IllegalStateException("이미 존재하는 회원");
                });

        memberRepository.save(member);
        return member.getEmail();
    }

    public Optional<Member> findMember(String email){
        return memberRepository.findByEmail(email);
    }
}
