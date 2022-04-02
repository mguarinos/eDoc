package com.ISSTG20.surveys.service.impl;

import java.util.List;
import com.ISSTG20.surveys.model.User;
import com.ISSTG20.surveys.service.UserService;
import com.ISSTG20.surveys.service.SubjectService;
import com.ISSTG20.surveys.model.SubjectDto;
import com.ISSTG20.surveys.model.Subject;

import com.ISSTG20.surveys.model.Question;

import com.ISSTG20.surveys.model.Answer;
import com.ISSTG20.surveys.model.AnswerDto;
import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.service.QuestionService;
import com.ISSTG20.surveys.dao.SubjectDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "subjectService")
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectDao subjectDao;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @Override
    public Subject findById(long id) {
        Subject subject = subjectDao.findSubjectById(id);
        return subject;
    }

    @Override
    public Subject save(SubjectDto subject) {
        Subject nSubject = subject.getSubjectFromDto();
        return subjectDao.save(nSubject);
    }

    @Override
    public List<Subject> getSubjects() {
        User user = userService.getUser();
        List<Subject> userSubjects = user.getSubjects();
        return userSubjects;
    }

}
