package com.ISSTG20.surveys.service;

import com.ISSTG20.surveys.model.Subject;
import com.ISSTG20.surveys.model.SubjectDto;

import java.util.List;

public interface SubjectService {
    Subject save(SubjectDto subject);
    Subject findById(long id);
    List<Subject> getSubjects();
}
