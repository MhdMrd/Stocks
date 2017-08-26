
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IRoleRepository extends JpaRepository<Role, Long>{
    @Query("SELECT r.idRole, r.nom, r.user.employe.nom, r.user.employe.nom FROM Role r WHERE r.idRole = :x")
    public Page<Object[]> getRole(@Param("x") Long idRole,Pageable pageable);
}
