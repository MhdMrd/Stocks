
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Employe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IEmployeRepository extends JpaRepository<Employe, Long>{
    @Query("SELECT e.idEmploye, e.matricule, e.nom, e.prenom, e.poste FROM Employe e WHERE e.idEmploye=:x ")
    public Page<Object[]> getOneEmploye(@Param("x")Long idEmploye, Pageable pageable);
    public Employe findByMatricule(String matricule);
    @Query("SELECT e.idEmploye, e.matricule, e.nom, e.prenom, e.poste FROM Employe e")
    public Page<Object[]> findAllEmployes(Pageable pageable);
}
