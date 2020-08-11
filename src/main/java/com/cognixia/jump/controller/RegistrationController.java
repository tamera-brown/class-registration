package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ResourceNotFoundException;
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

}

