package com.ISSTG20.surveys.controller;

import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.model.QuestionDto;
import com.ISSTG20.surveys.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/{subjectId}", method = RequestMethod.POST)
    public Question saveQuestion(@RequestBody QuestionDto question, @PathVariable long subjectId){
        return questionService.save(question, subjectId);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @RequestMapping(value="/{subjectId}", method = RequestMethod.GET)
    public List<Question> getQuestions(@PathVariable long subjectId){
        return questionService.getQuestions(subjectId);
    }

}
