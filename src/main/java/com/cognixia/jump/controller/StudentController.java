package com.cognixia.jump.controller;

import com.cognixia.jump.model.Student;
import com.cognixia.jump.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @PostMapping("/add/student")
    public ResponseEntity<String> addStudent(@Valid @RequestBody Student student) {
        if(service.existsById(student.getStudentId())) {
            return ResponseEntity.status(400).body("Student with id = " + student.getStudentId() + " already exists");
        } else {
            Student created = service.save(student);
            return ResponseEntity.status(201).body("Created: + " + created);
        }
    }

    @PutMapping("/update/student")
    public @ResponseBody String updateStudent(@RequestBody Student updateStudent) {
        Optional<Student> found = service.findById(updateStudent.getStudentId());

        if(found.isPresent()) {
            // use save to do a update
            service.save(updateStudent);
            return "Saved: " + updateStudent.toString();
        } else {
            return "Could not update student, the id = " + updateStudent.getStudentId() + " doesn't exist";
        }
    }

    @DeleteMapping("/delete/student/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable long id) {
        Optional<Student> found = service.findById(id);
        if(found.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.status(200).body("Delete student with id = " + id);
        } else {
            return ResponseEntity.status(400).body("Student with id= " + id + " not found");
        }

    }



}
