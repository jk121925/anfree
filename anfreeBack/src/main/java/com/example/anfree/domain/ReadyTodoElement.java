package com.example.anfree.domain;

import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Table(name = "ready_todo_list")
public class ReadyTodoElement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    private String email;
    @Column(name ="todo_element")
    private String todoElement;
    private Date date;


    public ReadyTodoElement(){}

    public ReadyTodoElement(Long id, Long userId, String email, String todoElement, Date date) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.todoElement = todoElement;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public ReadyTodoElement setId(long id) {
        this.id = id;
        return this;
    }

    public Long getUserId() {
        return userId;
    }

    public ReadyTodoElement setUserId(long userId) {
        this.userId = userId;
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
