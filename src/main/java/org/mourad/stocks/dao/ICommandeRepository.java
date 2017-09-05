
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Commande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface ICommandeRepository extends JpaRepository<Commande, Long>{
    @Query("SELECT c.idCommande, c.reference, c.categorie.nom, c.employeEmetteur.nom, c.employeEmetteur.prenom, c.quantiteRestante, c.quantiteACommander,c.dateCommande, c.observations FROM Commande c")
    public Page<Object[]> findAllCommandes(Pageable pageable);
    @Query("SELECT c.idCommande, c.reference, c.categorie.nom, c.employeEmetteur.nom, c.employeEmetteur.prenom, c.quantiteRestante, c.quantiteACommander,c.dateCommande, c.observations, c.categorie.idCategorie FROM Commande c WHERE c.idCommande=:x")
    public Page<Object[]> getCommande(@Param("x") Long idCommande, Pageable pageable);
    
}
