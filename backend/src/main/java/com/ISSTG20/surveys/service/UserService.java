package com.ISSTG20.surveys.service;

import com.ISSTG20.surveys.model.User;
import com.ISSTG20.surveys.model.UserDto;

import java.util.List;

public interface UserService {
    User save(UserDto user);
    List<User> findAll();
    List<User> findEnrolled(long subjectId);
    User findOne(String username);
    User enroll(long subjectId, long accountId);

    User getUser();
}
