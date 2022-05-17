package com.example.anfree.repository;

import com.example.anfree.domain.ReadyTodoElement;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
public class JpaReadyTodoElementRepository implements ReadyTodoElementRepository {

    private final EntityManager em;

    public JpaReadyTodoElementRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public ReadyTodoElement insertTodoElement(ReadyTodoElement readyTodoElement) {
        em.persist(readyTodoElement);
        return readyTodoElement;
    }

    @Override
    public Optional<ReadyTodoElement> findByElement(String todoElement, String email) {
        List<ReadyTodoElement> resultList = em.createQuery("select RTL from ReadyTodoElement RTL where RTL.todoElement =: todoElement and RTL.email =: email", ReadyTodoElement.class)
                .setParameter("todoElement",todoElement).setParameter("email", email).getResultList();
        return resultList.stream().findAny();
    }
}
