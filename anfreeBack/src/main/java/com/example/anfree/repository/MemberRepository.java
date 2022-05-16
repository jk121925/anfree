package com.example.anfree.repository;

import com.example.anfree.domain.Member;

import java.util.Optional;

public interface MemberRepository
{
    Member save(Member member);
    Optional<Member> findByEmailPw(String email, String password);

}
