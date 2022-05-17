package com.example.anfree.service;

import com.example.anfree.domain.ReadyTodoElement;
import com.example.anfree.repository.JpaReadyTodoElementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class ReadyTodoElementService {

    private final JpaReadyTodoElementRepository RTERepo;

    @Autowired
    public ReadyTodoElementService(JpaReadyTodoElementRepository RTERepo){this.RTERepo = RTERepo;}

    public String insertReadyTodoElement(ReadyTodoElement RTE){
//        RTERepo.findByElement(RTE.getTodoElement(), RTE.getEmail())
//                .ifPresent(rte ->{
//                    throw new IllegalStateException("이미 존재하는 todoList입니다.");
//                });
        RTERepo.insertTodoElement(RTE);
        return RTE.getTodoElement();
    }

    public Optional<ReadyTodoElement> findRTE(String todoElement , String email){return RTERepo.findByElement(todoElement, email);}


}
