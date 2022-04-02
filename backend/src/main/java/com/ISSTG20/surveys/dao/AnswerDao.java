package com.ISSTG20.surveys.dao;

import com.ISSTG20.surveys.model.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerDao extends CrudRepository<Answer, Long> {
    Answer findAnswerById(long id);
}