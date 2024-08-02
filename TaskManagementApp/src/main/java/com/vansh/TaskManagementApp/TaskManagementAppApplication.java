package com.vansh.TaskManagementApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;
import java.util.List;

@SpringBootApplication
public class TaskManagementAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementAppApplication.class, args);
	}

}
