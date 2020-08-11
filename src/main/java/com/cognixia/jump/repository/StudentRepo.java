package com.cognixia.jump.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognixia.jump.model.Student;

public interface StudentRepo extends JpaRepository<Student, Long>{

}
