package com.hoaxify.ws.user;

import org.springframework.data.jpa.repository.JpaRepository;

//Jpa repo içinde User: domain model objesi
//long ise id mizi ifade eden değer
//database erişmemiz için standart birkaç metodu barındıran bir interface
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
