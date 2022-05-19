package com.example.anfree.repository;

import com.example.anfree.domain.Member;
import com.example.anfree.domain.ReadyTodoElement;

import java.util.List;
import java.util.Optional;

public interface MemberRepository
{
    Member save(Member member);
    Optional<Member> findByEmailPw(String email, String password);
    Optional<Member> findByEmail(String email);
    List<Member> findAll();
//    List<ReadyTodoElement> findAllRTE();

}
