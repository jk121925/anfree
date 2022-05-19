package com.example.anfree.domain;

import lombok.Data;
import lombok.ToString;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;
import java.util.Date;

@ToString
@Entity
@Table(name = "ready_todo_list")
public class ReadyTodoElement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RTE_id")
    private Long RTEId;
    @Column(name = "member_id")
    private Long memberId;
    private String email;
    @Column(name ="todo_element")
    private String todoElement;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;

    public ReadyTodoElement(){}
    public ReadyTodoElement(Long RTEId, Long memberId, String email, String todoElement, Date date) {
        this.RTEId = RTEId;
        this.memberId = memberId;
        this.email = email;
        this.todoElement = todoElement;
        this.date = date;
    }

    public Long setRTEId() {
        return RTEId;
    }

    public ReadyTodoElement setRTEId(long RTEId) {
        this.RTEId = RTEId;
        return this;
    }

    public Long getMemberId() {
        return memberId;
    }

    public ReadyTodoElement setMemberId(long memberId) {
        this.memberId = memberId;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public ReadyTodoElement setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getTodoElement() {
        return todoElement;
    }

    public ReadyTodoElement setTodoElement(String todoElement) {
        this.todoElement = todoElement;
        return this;
    }

    public Date getDate() {
        return date;
    }

    public ReadyTodoElement setDate(Date date) {
        this.date = date;
        return this;
    }
}
