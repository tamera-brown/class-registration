package com.cognixia.jump.exception;

public class InvalidPasswordException extends Exception {
    private static final long serialVersionUID = 1L;
    public InvalidPasswordException(String password) {
        super("Password given is " + password + ", but should be minimum eight characters, " +
                "at least one letter and one number");
    }
}
