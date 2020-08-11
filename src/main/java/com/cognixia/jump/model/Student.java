package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
public class Student implements Serializable {

 private static final long serialVersionUID = 1L;

	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private Long studentId;
	
	 @NotBlank
	 private String firstName;
	
	 @NotBlank
	 private String lastName;
	
	 @Column(nullable = false)
	 private String email;
	
	 @NotBlank
	 @Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
	 private String password;
	
	 public Student() {
	     this((long) -1, "N/A", "N/A", "N/A", "N/A");
	 }
	
	 public Student(Long studentId, @NotBlank String firstName, @NotBlank String lastName, String email, @NotBlank @Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$") String password) {
	     this.studentId = studentId;
	     this.firstName = firstName;
	     this.lastName = lastName;
	     this.email = email;
	     this.password = password;
	 }
	
	 public static long getSerialVersionUID() {
	     return serialVersionUID;
	 }
	
	 public Long getStudentId() {
	     return studentId;
	 }
	
	 public void setStudentId(Long studentId) {
	     this.studentId = studentId;
	 }
	
	 public String getFirstName() {
	     return firstName;
	 }
	
	 public void setFirstName(String firstName) {
	     this.firstName = firstName;
	 }
	
	 public String getLastName() {
	     return lastName;
	 }
	
	 public void setLastName(String lastName) {
	     this.lastName = lastName;
	 }
	
	 public String getEmail() {
	     return email;
	 }
	
	 public void setEmail(String email) {
	     this.email = email;
	 }
	
	 public String getPassword() {
	     return password;
	 }
	
	 public void setPassword(String password) {
	     this.password = password;
	 }
	
	 @Override
	 public String toString() {
	     return "Student{" +
	             "studentId=" + studentId +
	             ", firstName='" + firstName + '\'' +
	             ", lastName='" + lastName + '\'' +
	             ", email='" + email + '\'' +
	             ", password='" + password + '\'' +
	             '}';
	 }
	}
	
