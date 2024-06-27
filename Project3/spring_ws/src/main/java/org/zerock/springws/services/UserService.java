package org.zerock.springws.services;

import org.zerock.springws.dtos.UserDto;
import org.zerock.springws.entities.Users;
import org.zerock.springws.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zerock.springws.errorhandlers.UserNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) throws UserNotFoundException {
        return userRepository
                .findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public UserDto createUser(UserDto userDto) {
        Users user = new Users();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user = userRepository.save(user);
        return convertToDto(user);
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        Users user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user = userRepository.save(user);
        return convertToDto(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDto convertToDto(Users user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        return userDto;
    }
}