package lk.ijse.holybridge.service;


import lk.ijse.holybridge.dto.UserDTO;

public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);
}