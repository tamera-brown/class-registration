package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Courses;
import com.cognixia.jump.repository.CourseRepository;



@RequestMapping("/api")
@RestController
public class CourseController {
	
	@Autowired
	CourseRepository repository;
	
	
	@GetMapping("/courses")
	public List<Courses> getAllCourses(){
		return repository.findAll();
	}
	
	@GetMapping("/courses/{course_id}")
	public Courses getOneCourseById(@PathVariable Long course_id) throws ResourceNotFoundException {
		Optional<Courses>found=repository.findById(course_id);
		if (!found.isPresent()) {
			throw new ResourceNotFoundException("Course with the id: " + course_id + " is not found");
			
			
		}
		  return found.get() ;
	}
	
	@DeleteMapping("/delete/courses/{couse_id}")
    public ResponseEntity<String> deleteCourseById(@PathVariable Long course_id){
	    Optional<Courses> found=repository.findById(course_id);
	    if (!found.isPresent()) {
	    	ResponseEntity.status(404)
	    	.body("Courses with id " + course_id + "is not deleted because it is not in the database");
		}
	    repository.deleteById(course_id);
		return ResponseEntity.status(200).body("Couses with id " + course_id + " has been deleted");
	    
	}	
	
	@PostMapping("/add/courses/")
	public ResponseEntity<String> addNewCourse(@Valid @RequestBody Courses newCourse){ 
		Optional<Courses> found=repository.findById(newCourse.getCourse_id());
		if (!found.isPresent()) {
			repository.save(newCourse);
			return ResponseEntity.status(200).body("The course " + newCourse.getCourse_Name() + " has been added");
		}
		return ResponseEntity.status(404).body("This course " + newCourse.getCourse_Name() + " is already exists");
		
	}
	@PutMapping("/update/courses/")
	public ResponseEntity<Courses> updateACourse(@RequestBody Courses course) throws ResourceNotFoundException{
		Optional<Courses> found=repository.findById(course.getCourse_id());
		if (!found.isPresent()) {
			throw new  ResourceNotFoundException("The course "+course.getCourse_Name()+ " is not exists");
		}
		 Courses updateCourse=repository.save(course);
		 return new ResponseEntity<Courses>(updateCourse,HttpStatus.ACCEPTED);
		
	}

}
