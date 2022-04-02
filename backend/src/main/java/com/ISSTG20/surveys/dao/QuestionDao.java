package com.ISSTG20.surveys.dao;

import com.ISSTG20.surveys.model.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionDao extends CrudRepository<Question, Long> {
    Question findQuestionById(long id);
}