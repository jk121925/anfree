package com.example.anfree.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;
    private String name;
    private String email;
    private String password;
    private String sex;
//    @OneToMany(mappedBy = "member")
//    private List<ReadyTodoElement> RTEList  = new ArrayList<ReadyTodoElement>();

    public Member(){}
    public Member( String name, String email, String password, String sex) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.sex = sex;
    }

//    public List<ReadyTodoElement> getRTEList() {
//        return RTEList;
//    }
//
//    public Member setRTEList(List<ReadyTodoElement> RTEList) {
//        this.RTEList = RTEList;
//        return this;
//    }

    public Long getMemberId() {
        return memberId;
    }

    public Member setMemberId(Long memberId) {
        this.memberId = memberId;
        return this;
    }

    public String getName() {
        return name;
    }

    public Member setName(String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Member setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public Member setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getSex() {
        return sex;
    }

    public Member setSex(String sex) {
        this.sex = sex;
        return this;
    }




}
