package com.example.anfree.repository;

import com.example.anfree.domain.Member;
import com.example.anfree.domain.ReadyTodoElement;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
public class JpaMemberRepository implements MemberRepository{

    private final EntityManager em;

    public JpaMemberRepository(EntityManager em){
        this.em = em;
    }


    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findByEmailPw(String email, String password) {
        List<Member> result = em.createQuery("select m from Member m WHERE m.email =:email and m.password = :password", Member.class)
                .setParameter("email",email).setParameter("password", password).getResultList();
        return result.stream().findAny();
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        List<Member> resultList = em.createQuery("select m from Member m where m.email =:email", Member.class).setParameter("email", email).getResultList();
        return resultList.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        return em.createQuery("select m from Member m",Member.class).getResultList();
    }

}
