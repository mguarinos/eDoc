package com.ISSTG20.surveys.service.impl;

import com.ISSTG20.surveys.dao.RoleDao;
import com.ISSTG20.surveys.model.Role;
import com.ISSTG20.surveys.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    @Override
    public Role findByName(String name) {
        Role role = roleDao.findRoleByName(name);
        return role;
    }
}
