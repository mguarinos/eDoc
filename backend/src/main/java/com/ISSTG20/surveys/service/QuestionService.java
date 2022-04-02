package com.ISSTG20.surveys.service;

import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.model.QuestionDto;

import java.util.List;

public interface QuestionService {
    Question save(QuestionDto question, long subjectId);
    Question findById(long id);
    List<Question> getQuestions(long subjectId);
}
