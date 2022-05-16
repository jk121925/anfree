package com.example.anfree.domain;

import javax.persistence.*;

@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String sex;

    public Member(){}
    public Member( String name, String email, String password, String sex) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.sex = sex;
    }

    public Long getId() {
        return id;
    }

    public Member setId(Long id) {
        this.id = id;
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
