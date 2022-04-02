package com.ISSTG20.surveys.dao;

import com.ISSTG20.surveys.model.Subject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectDao extends CrudRepository<Subject, Long> {
    Subject findSubjectById(long id);
}