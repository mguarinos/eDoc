package com.ISSTG20.surveys.service.impl;

import java.util.List;
import com.ISSTG20.surveys.service.AnswerService;
import com.ISSTG20.surveys.service.UserService;
import com.ISSTG20.surveys.model.Answer;
import com.ISSTG20.surveys.model.AnswerDto;
import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.dao.AnswerDao;
import com.ISSTG20.surveys.dao.QuestionDao;
import com.ISSTG20.surveys.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "answerService")
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AnswerDao answerDao;

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private UserService userService;

    @Override
    public Answer save(AnswerDto answer, long questionId) {
        Answer nAnswer = answer.getAnswerFromDto();
        Question question = questionService.findById(questionId);

        // Si ya se ha respondido la pregunta, no se debe guardar de nuevo.
        if (question.getUsersAlreadyAnswered().contains(userService.getUser().getId()))
          return new Answer();

        question.getUsersAlreadyAnswered().add(userService.getUser().getId());
        questionDao.save(question);

        nAnswer.setQuestion(question);
        return answerDao.save(nAnswer);
    }

    @Override
    public List<Answer> getAnswers(long questionId) {
      Question question = questionService.findById(questionId);
      return question.getAnswers();
    }

}
