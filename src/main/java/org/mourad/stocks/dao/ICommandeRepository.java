
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Commande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface ICommandeRepository extends JpaRepository<Commande, Long>{
    @Query("SELECT c.reference, c.categorie.nom, c.employe.nom, c.quantiteACommander,c.dateCommande FROM Commande c")
    public Page<Object[]> findAllCommandes(Pageable pageable);
}
