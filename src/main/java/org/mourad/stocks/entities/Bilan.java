
package org.mourad.stocks.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"annee", "mois", "categorie"})
)
public class Bilan implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBilan;
    @ManyToOne
    @JoinColumn(name = "categorie")
    private Categorie categorie;
    @Column(nullable = false)
    private String mois;
    @Column(nullable = false)
    private String annee;
    @Column(nullable = false)
    private int quantiteDebut;
    @Column(nullable = false)
    private int approvisionnement;
    @Column(nullable = false)
    private int qteVenteOrdinaire;
    @Column(nullable = false)
    private int pUVO;
    @Column(nullable = false)
    private int qteVentePromotionnel;
    @Column(nullable = false)
    private int pUVP;
    @Column(nullable = false)
    private int destockage;
    @Column(nullable = false)
    private int defectueux;
    @Column(nullable = false)
    private int quantiteFin;

    public Bilan() {
    }

    public Bilan(Categorie categorie, String mois, String annee, int quantiteDebut, int approvisionnement, int qteVenteOrdinaire, int pUVO, int qteVentePromotionnel, int pUVP, int destockage, int defectueux, int quantiteFin) {
        this.categorie = categorie;
        this.mois = mois;
        this.annee = annee;
        this.quantiteDebut = quantiteDebut;
        this.approvisionnement = approvisionnement;
        this.qteVenteOrdinaire = qteVenteOrdinaire;
        this.pUVO = pUVO;
        this.qteVentePromotionnel = qteVentePromotionnel;
        this.pUVP = pUVP;
        this.destockage = destockage;
        this.defectueux = defectueux;
        this.quantiteFin = quantiteFin;
    }

    public int getApprovisionnement() {
        return approvisionnement;
    }

    public void setApprovisionnement(int approvisionnement) {
        this.approvisionnement = approvisionnement;
    }

    public int getQteVenteOrdinaire() {
        return qteVenteOrdinaire;
    }

    public void setQteVenteOrdinaire(int qteVenteOrdinaire) {
        this.qteVenteOrdinaire = qteVenteOrdinaire;
    }

    public int getpUVO() {
        return pUVO;
    }

    public void setpUVO(int pUVO) {
        this.pUVO = pUVO;
    }

    public int getQteVentePromotionnel() {
        return qteVentePromotionnel;
    }

    public void setQteVentePromotionnel(int qteVentePromotionnel) {
        this.qteVentePromotionnel = qteVentePromotionnel;
    }

    public int getpUVP() {
        return pUVP;
    }

    public void setpUVP(int pUVP) {
        this.pUVP = pUVP;
    }

    public int getDestockage() {
        return destockage;
    }

    public void setDestockage(int destockage) {
        this.destockage = destockage;
    }

    public int getDefectueux() {
        return defectueux;
    }

    public void setDefectueux(int defectueux) {
        this.defectueux = defectueux;
    }

    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public String getMois() {
        return mois;
    }

    public void setMois(String mois) {
        this.mois = mois;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public int getQuantiteDebut() {
        return quantiteDebut;
    }

    public void setQuantiteDebut(int quantiteDebut) {
        this.quantiteDebut = quantiteDebut;
    }

    public int getQuantiteFin() {
        return quantiteFin;
    }

    public void setQuantiteFin(int quantiteFin) {
        this.quantiteFin = quantiteFin;
    }
    
}
