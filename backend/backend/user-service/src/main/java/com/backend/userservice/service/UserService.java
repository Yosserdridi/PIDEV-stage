package com.backend.userservice.service;

import com.backend.userservice.dto.CreateUserRequest;
import com.backend.userservice.dto.UpdateUserRequest;
import com.backend.userservice.dto.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO createUser(CreateUserRequest request);
    UserDTO updateUser(Long id, UpdateUserRequest request);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    void deleteUser(Long id);
    UserDTO getUserByUsername(String username);

}