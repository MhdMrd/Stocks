
package org.mourad.stocks.dao;

import java.util.Collection;
import javax.persistence.NamedNativeQuery;
import javax.persistence.NamedQuery;
import javax.persistence.QueryHint;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Situation;
import org.mourad.stocks.entities.Vente;
import org.springframework.data.annotation.QueryAnnotation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IProduitRepository extends JpaRepository<Produit, Long>{
    @Query("SELECT p FROM Produit p, Vente v WHERE p.numSerie=v.produit AND (v.produit IN :x)")
    public Page<Produit> listeProduitsParNumSerie(@Param("x")Collection<Vente> ventes, Pageable pageable);
    @Query("SELECT p.idProduit, p.numSerie, p.designation, p.categorie.nom, p.prixNormal, p.prixPromotionel FROM Produit p WHERE p.situation=:x")
    public Page<Object[]> findBySituation(@Param("x") Situation situation, Pageable pageable);
}
