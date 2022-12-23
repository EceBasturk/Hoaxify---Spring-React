package com.hoaxify.ws;

import com.hoaxify.ws.obje.Obje;
import com.hoaxify.ws.obje.ObjeService;
import com.hoaxify.ws.obje.vm.ObjeSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService, ObjeService objeService) {
		return (args) -> {
			for(int i = 1; i<=9;i++) {
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("P4ssword");
				userService.save(user);
				for(int j = 1;j<=15;j++) {
					ObjeSubmitVM obje = new ObjeSubmitVM();
					obje.setContent("content (" +j + ") from user ("+i+")");
					objeService.save(obje, user);
				}
			}
		};
	}

}
