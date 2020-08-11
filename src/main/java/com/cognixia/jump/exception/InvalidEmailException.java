package com.cognixia.jump.exception;

public class InvalidEmailException extends Exception {
    private static final long serialVersionUID = 1L;
    public InvalidEmailException(String email) {
        super("Email given is " + email + " but should not have numbers in the " +
                "domain and doesn't allow for top level domains that are " +
                "less than 2 or more than 3 letters");
    }
}
