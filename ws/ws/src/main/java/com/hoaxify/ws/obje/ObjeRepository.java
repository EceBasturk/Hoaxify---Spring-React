package com.hoaxify.ws.obje;

import com.hoaxify.ws.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ObjeRepository extends JpaRepository<Obje, Long>, JpaSpecificationExecutor<Obje> {
    Page<Obje> findByUser(User inDB, Pageable page);

//    Page<Obje> findByIdLessThan(long id, Pageable page);
//    Page<Obje> findByIdLessThanAndUser(long id, User user, Pageable page);
//
//    long countByIdGreaterThan(long id);
//
//    long countByIdGreaterThanAndUser(long id, User user);
//
//    List<Obje> findByIdGreaterThan(long id, Sort sort);
//
//    List<Obje> findByIdGreaterThanAndUser(long id, User user, Sort sort);
}
