
package org.mourad.stocks.dao;

import java.util.Collection;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.EtatVente;
import org.mourad.stocks.entities.Etats;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Situation;
import org.mourad.stocks.entities.Vente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IVenteRepository extends JpaRepository<Vente, Long>{
    @Query("SELECT v.idVente, v.employe.nom, v.employe.prenom, v.produit.designation, v.produit.categorie.nom, v.dateVente, v.etat, v.produit.prixNormal, v.client.nom, v.client.prenom FROM Vente v")
    public Page<Object[]> findAllVentes(Pageable pageable);
    
    public Vente findByProduitAndEmploye(Produit produit, Employe employe);
    
    @Query("SELECT v.employe.nom, v.produit.designation, v.dateVente FROM Vente v WHERE v.etat=:x")
    public Page<Object[]> findAllByEtat(@Param("x")EtatVente etat, Pageable pageable);
    
    @Query("SELECT v.produit.designation, v.dateVente FROM Vente v WHERE v.employe.idEmploye=:x")
    public Page<Object[]> findVentesDe(@Param("x")Long idEmploye, Pageable pageable);
    
    @Query("SELECT v.idVente, v.employe.nom, v.employe.prenom, v.produit.designation, v.produit.categorie.nom, v.dateVente, v.etat, v.produit.prixNormal, v.client.nom, v.client.prenom, v.client.idClient, v.produit.idProduit, v.employe.idEmploye FROM Vente v WHERE v.idVente=:x")
    public Page<Object[]> getVente(@Param("x") Long idVente, Pageable pageable);
}
