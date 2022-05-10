package com.ISSTG20.surveys.service;

import com.ISSTG20.surveys.model.Answer;
import com.ISSTG20.surveys.model.AnswerDto;

import java.util.List;

public interface AnswerService {
    Answer save(AnswerDto answer, long questionId);
    List<Answer> getAnswers(long questionId);
}
