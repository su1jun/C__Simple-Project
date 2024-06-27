package org.zerock.springws.errorhandlers;

public class UserNotFoundException extends RuntimeException  {
    public UserNotFoundException(String message) {
        super(message);
    }
}