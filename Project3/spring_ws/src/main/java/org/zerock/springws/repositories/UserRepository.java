package org.zerock.springws.repositories;

import org.zerock.springws.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
}