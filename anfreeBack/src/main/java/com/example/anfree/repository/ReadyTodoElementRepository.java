package com.example.anfree.repository;

import com.example.anfree.domain.ReadyTodoElement;

import java.util.Optional;

public interface ReadyTodoElementRepository {
    ReadyTodoElement insertTodoElement(ReadyTodoElement readyTodoElement);
    Optional<ReadyTodoElement> findByElement(String todoElement, String email);

}
