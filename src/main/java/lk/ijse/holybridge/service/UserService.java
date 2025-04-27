package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.UserDTO;

import java.util.List;

public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);
    List<UserDTO> getAllUsers();
}