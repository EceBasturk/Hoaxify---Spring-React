package com.hoaxify.ws.obje;

import com.hoaxify.ws.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ObjeRepository extends JpaRepository<Obje, Long> {
    Page<Obje> findByUser(User inDB, Pageable page);

    Page<Obje> findByIdLessThan(long id, Pageable page);
    Page<Obje> findByIdLessThanAndUser(long id, User user, Pageable page);

    long countByIdGreaterThan(long id);
}
