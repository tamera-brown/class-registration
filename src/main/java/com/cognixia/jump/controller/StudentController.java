package com.cognixia.jump.controller;

import com.cognixia.jump.model.Student;
import com.cognixia.jump.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RequestMapping("/studentApi")
@RestController
public class StudentController {
    @Autowired
    StudentRepo service;

    @GetMapping("/allStudents")
    public List<Student> getAllStudents() {
        return service.findAll();
    }

    @GetMapping("/student/{id}")
    public Student getStudentById(@PathVariable long id) {
        Optional<Student> found = service.findById(id);

        if(found.isPresent()) {
            return found.get();
        }

        return new Student();
    }

    @GetMapping("/student/{lastName}")
    public Student getStudentByLastName() {
        return new Student();
    }



}
