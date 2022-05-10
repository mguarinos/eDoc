package com.ISSTG20.surveys.controller;

import com.ISSTG20.surveys.model.Subject;
import com.ISSTG20.surveys.model.SubjectDto;
import com.ISSTG20.surveys.model.Question;
import com.ISSTG20.surveys.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/", method = RequestMethod.POST)
    public Subject saveSubject(@RequestBody SubjectDto subject){
        return subjectService.save(subject);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'TEACHER')")
    @RequestMapping(value="/", method = RequestMethod.GET)
    public List<Subject> getSubjects(){
        return subjectService.getSubjects();
    }




}
