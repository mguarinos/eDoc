package com.ISSTG20.surveys.service;

import com.ISSTG20.surveys.model.Role;

public interface RoleService {
    Role findByName(String name);
}
