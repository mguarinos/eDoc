package com.ISSTG20.surveys.service.impl;

import java.util.List;
import java.util.ArrayList;
import com.ISSTG20.surveys.model.User;
import com.ISSTG20.surveys.model.UserDto;
import com.ISSTG20.surveys.service.SubjectService;
import com.ISSTG20.surveys.service.QuestionService;
import com.ISSTG20.surveys.service.UserService;
import com.ISSTG20.surveys.model.Subject;
import com.ISSTG20.surveys.dao.QuestionDao;
import com.ISSTG20.surveys.dao.SubjectDao;
import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.model.QuestionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "questionService")
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private SubjectDao subjectDao;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @Override
    public Question findById(long id) {
        Question question = questionDao.findQuestionById(id);
        return question;
    }

    @Override
    public Question save(QuestionDto question, long subjectId) {
        Question nQuestion = question.getQuestionFromDto();
        Subject subject = subjectService.findById(subjectId);

        nQuestion.setSubject(subject);

        return questionDao.save(nQuestion);
    }

    @Override
    public List<Question> getQuestions(long subjectId) {
        Subject subject = subjectDao.findSubjectById(subjectId);
        List<Question> questions = subject.getQuestions();
        List<Question> unansweredQuestions = new ArrayList<Question>();

        for (Question question : questions) {
          boolean duplicated = false;

          System.out.println("getUsersAlreadyAnswered = " + question.getUsersAlreadyAnswered().toString());

          for (Long userId : question.getUsersAlreadyAnswered())
            if (userId == userService.getUser().getId())
              duplicated = true;

          if (!duplicated)
            unansweredQuestions.add(question);
        }

        return unansweredQuestions;
    }
}
