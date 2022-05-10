package com.ISSTG20.surveys.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.ISSTG20.surveys.dao.UserDao;
import com.ISSTG20.surveys.dao.SubjectDao;
import com.ISSTG20.surveys.model.Role;
import com.ISSTG20.surveys.model.User;
import com.ISSTG20.surveys.model.Subject;
import com.ISSTG20.surveys.model.UserDto;
import com.ISSTG20.surveys.service.RoleService;
import com.ISSTG20.surveys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.security.core.context.SecurityContextHolder;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private SubjectDao subjectDao;


    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    public List<User> findEnrolled(long subjectId) {
        List<User> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(user -> {
          user.getSubjects().forEach((v) -> {
            if (v.getId() == subjectId) {
              list.add(user);
            }
          });
        });
        return list;
    }

    @Override
    public User findOne(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public User save(UserDto user) {

        User nUser = user.getUserFromDto();
        nUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        return userDao.save(nUser);
    }

    @Override
    public User enroll(long subjectId, long accountId) {

        User user = userDao.findById(accountId);
        Subject subject = subjectDao.findSubjectById(subjectId);

        List<Subject> userSubjects = user.getSubjects();
        userSubjects.add(subject);

        return userDao.save(user);
    }



    @Override
    public User getUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username = (principal instanceof UserDetails) ? ((UserDetails)principal).getUsername() : principal.toString();

        User user = userDao.findByUsername(username);

        return user;
    }


}
