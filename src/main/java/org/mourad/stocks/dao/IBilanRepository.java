
package org.mourad.stocks.dao;

import java.time.Month;
import java.time.Year;
import org.mourad.stocks.entities.Bilan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IBilanRepository extends JpaRepository<Bilan, Long>{
    @Query("SELECT b.idBilan, b.annee, b.mois, b.quantiteDebut, b.quantiteFin, b.categorie.nom, b.categorie.idCategorie, b.approvisionnement,b.qteVenteOrdinaire, b.pUVO, b.qteVentePromotionnel, b.pUVP, b.destockage, b.defectueux FROM Bilan b")
    public Page<Object[]> getAllBilans(Pageable pageable);
    @Query("SELECT b.idBilan, b.annee, b.mois, b.quantiteDebut, b.quantiteFin, b.categorie.nom, b.categorie.idCategorie, b.approvisionnement,b.qteVenteOrdinaire, b.pUVO, b.qteVentePromotionnel, b.pUVP, b.destockage, b.defectueux FROM Bilan b WHERE b.categorie.idCategorie=:x and b.mois=:y and b.annee=:z")
    public Page<Object[]> getBilanCategorieMois(@Param("x") Long idCategorie, @Param("y") String mois, @Param("z")String annee, Pageable pageable);
    @Query("SELECT b.idBilan, b.annee, b.mois, b.quantiteDebut, b.quantiteFin, b.categorie.nom, b.categorie.idCategorie, b.approvisionnement,b.qteVenteOrdinaire, b.pUVO, b.qteVentePromotionnel, b.pUVP, b.destockage, b.defectueux  FROM Bilan b WHERE b.idBilan = :x")
    public Page<Object[]> getBilan(@Param("x") Long idBilan, Pageable pageable);
    @Query("SELECT b.idBilan, b.annee, b.quantiteFin, b.categorie.nom, b.categorie.idCategorie, SUM(b.approvisionnement),SUM(b.qteVenteOrdinaire), b.pUVO, SUM(b.qteVentePromotionnel), b.pUVP, SUM(b.destockage), SUM(b.defectueux) FROM Bilan b WHERE b.annee = :x AND b.categorie.idCategorie = :y")
    public Page<Object[]> genererBilanAnnuel(@Param("x") String annee, @Param("y") Long idCategorie, Pageable pageable);
    @Query("SELECT b.idBilan, b.annee, b.mois, b.quantiteDebut, b.quantiteFin, b.categorie.nom, b.categorie.idCategorie, b.approvisionnement,b.qteVenteOrdinaire, b.pUVO, b.qteVentePromotionnel, b.pUVP, b.destockage, b.defectueux FROM Bilan b WHERE b.annee = :x AND b.mois = :y")
    public Page<Object[]> genererBilanMensuel(@Param("x") String annee, @Param("y") String mois, Pageable pageable);
}   
