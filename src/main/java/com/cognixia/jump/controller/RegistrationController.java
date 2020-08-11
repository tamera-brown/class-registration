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
import com.cognixia.jump.model.Registration;
import com.cognixia.jump.repository.RegistrationRepository;

@RequestMapping("/api")
@RestController()
public class RegistrationController {
	
	@Autowired
	RegistrationRepository repository;
	
	
	
	@GetMapping("/registration")
	public List<Registration> getAllRegistrations(){
		return repository.findAll();
	}
	
	@GetMapping("/registration/{id}")
	public Registration getOneRegistration(@PathVariable Long registration_id) throws ResourceNotFoundException {
		 Optional<Registration>found=repository.findById(registration_id);
		if (!found.isPresent()) {
			throw new ResourceNotFoundException("The registration with id: " + registration_id + " not found");
		}
		return found.get();
	}
	
	@DeleteMapping("/delete/registration/{registration_id}")
    public ResponseEntity<String> deleteRegistrationById(@PathVariable Long registration_id){
	    Optional<Registration> found=repository.findById(registration_id);
	    if (!found.isPresent()) {
	    	ResponseEntity.status(404)
	    	.body("Registration with id " + registration_id + "is not deleted because it is not in the database");
		}
	    repository.deleteById(registration_id);
		return ResponseEntity.status(200).body("Registration with id " + registration_id + " has been deleted");
	    
	}	
	
	@PostMapping("/add/registration/")
	public ResponseEntity<String> addNewRegistration(@Valid @RequestBody Registration newRegistration){ 
		Optional<Registration> found=repository.findById(newRegistration.getRegistration_id());
		if (!found.isPresent()) {
			repository.save(newRegistration);
			return ResponseEntity.status(200).body("The registration with id: " + newRegistration.getRegistration_id() + " has been added");
		}
		return ResponseEntity.status(404).body("This registration with id: " + newRegistration.getRegistration_id() + " is already exists");
		
	}
	@PutMapping("/update/registration/")
	public ResponseEntity<Registration> updateARegistration(@RequestBody Registration registration) throws ResourceNotFoundException{
		Optional<Registration> found=repository.findById(registration.getRegistration_id());
		if (!found.isPresent()) {
			throw new  ResourceNotFoundException("The course with id: "+registration.getRegistration_id()+ " is not exists");
		}
		 Registration updateRegistration=repository.save(registration);
		 return new ResponseEntity<Registration>(updateRegistration,HttpStatus.ACCEPTED);
		
	}

}

