package com.cognixia.jump.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognixia.jump.model.Courses;

public interface CourseRepository extends JpaRepository<Courses, Long> {

}