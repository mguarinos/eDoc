package com.ISSTG20.surveys.controller;

import com.ISSTG20.surveys.model.Subject;
import com.ISSTG20.surveys.model.SubjectDto;
import com.ISSTG20.surveys.model.Answer;
import com.ISSTG20.surveys.model.AnswerDto;
import com.ISSTG20.surveys.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/answer")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value="/{questionId}", method = RequestMethod.POST)
    public Answer save(@RequestBody AnswerDto answer, @PathVariable long questionId){
        return answerService.save(answer, questionId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'TEACHER')")
    @RequestMapping(value="/{questionId}", method = RequestMethod.GET)
    public List<Answer> getAnswers(@PathVariable long questionId){
        return answerService.getAnswers(questionId);
    }

}
