package com.ISSTG20.surveys.service.impl;

import com.ISSTG20.surveys.service.AnswerService;
import com.ISSTG20.surveys.model.Answer;
import com.ISSTG20.surveys.model.AnswerDto;
import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.dao.AnswerDao;
import com.ISSTG20.surveys.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "answerService")
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AnswerDao answerDao;

    @Override
    public Answer save(AnswerDto answer, long questionId) {
        Answer nAnswer = answer.getAnswerFromDto();
        Question question = questionService.findById(questionId);
        
        nAnswer.setQuestion(question);

        return answerDao.save(nAnswer);
    }

}
