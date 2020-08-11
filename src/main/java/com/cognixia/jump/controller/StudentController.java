package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Student;
import com.cognixia.jump.repository.StudentRepo;



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
