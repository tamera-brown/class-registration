package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Registration implements Serializable {
	
	
	private static final long serialVersionUID = 8756706368884157278L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long registration_id;
	@NotBlank
	private Integer course_id;
	@NotBlank
	private Integer studentId;
	@NotNull
	private boolean isDropped;
	
	public Registration() {
		this(-1L,-1, -1, false);
	}

	public Registration(Long registration_id, @NotBlank Integer course_id, @NotBlank Integer studentId, @NotNull boolean isDropped) {
		this.registration_id = registration_id;
		this.course_id = course_id;
		this.studentId = studentId;
		this.isDropped = isDropped;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public Long getRegistration_id() {
		return registration_id;
	}

	public void setRegistration_id(Long registration_id) {
		this.registration_id = registration_id;
	}

	public Integer getCourse_id() {
		return course_id;
	}

	public void setCourse_id(Integer course_id) {
		this.course_id = course_id;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public boolean isDropped() {
		return isDropped;
	}

	public void setDropped(boolean dropped) {
		isDropped = dropped;
	}

	@Override
	public String toString() {
		return "Registration{" +
				"registration_id=" + registration_id +
				", course_id=" + course_id +
				", studentId=" + studentId +
				", isDropped=" + isDropped +
				'}';
	}
}