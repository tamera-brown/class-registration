package com.cognixia.jump.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Courses implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4483590821868855174L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long course_id;
	@NotNull(message = "Course name can not be null")
	private String course_Name;
	@Column(nullable=false)
	private String department;
	@Column(nullable=false)
	private Integer credit;
	
	public Courses(Long course_id) {
		this.course_id = course_id;
		
	}
	
	public Courses() {
		this(-1L, "N/A", "N/A", 0);
	}
	
	public Courses(Long course_id, @NotNull(message = "Course name can not be null") String course_Name,
			String department, Integer credit) {
		super();
		this.course_id = course_id;
		this.course_Name = course_Name;
		this.department = department;
		this.credit = credit;
	}

	public Long getCourse_id() {
		return course_id;
	}

	public void setCourse_id(Long course_id) {
		this.course_id = course_id;
	}

	public String getCourse_Name() {
		return course_Name;
	}

	public void setCourse_Name(String course_Name) {
		this.course_Name = course_Name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Integer getCredit() {
		return credit;
	}

	public void setCredit(Integer credit) {
		this.credit = credit;
	}

	@Override
	public String toString() {
		return "Courses [course_id=" + course_id + ", course_Name=" + course_Name + ", department=" + department
				+ ", credit=" + credit + "]";
	}
	
	
	
	
	
	
	
}
