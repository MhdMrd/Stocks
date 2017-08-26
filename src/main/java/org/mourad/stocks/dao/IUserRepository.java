
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IUserRepository extends JpaRepository<User, Long>{
    @Query("SELECT u.idUser, u.username, u.isActive,u.employe.nom, u.employe.prenom FROM User u WHERE u.idUser = :x")
    public Page<Object[]> getUser(@Param("x") Long idUser, Pageable pageable);
}
