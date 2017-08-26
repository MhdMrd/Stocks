
package org.mourad.stocks.entities;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */

@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"designation", "situation", "categorie"})
)
public class Produit implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduit;
    @Column(nullable = false, unique = true)
    private String numSerie;
    @Column(nullable = false)
    private String designation;
    @Column(nullable = false)
    private int seuil;
    @Column(nullable = false)
    private int prixNormal;
    @Column(nullable = false)
    private int prixPromotionel;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private  Etats etat;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Situation situation;
    private String remarque;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categorie", nullable = false)
    private Categorie categorie;
    @OneToOne(mappedBy = "produit")
    private Vente vente;
    public Produit() {
    }

    public Produit(String numSerie, String designation, int seuil, int prixNormal, int prixPromotionel, Etats etat, Situation situation, String remarque, Categorie categorie) {
        this.numSerie = numSerie;
        this.designation = designation;
        this.seuil = seuil;
        this.prixNormal = prixNormal;
        this.prixPromotionel = prixPromotionel;
        this.etat = etat;
        this.situation = situation;
        this.remarque = remarque;
        this.categorie = categorie;
    }

    public Long getIdProduit() {
        return idProduit;
    }

    public void setIdProduit(Long idProduit) {
        this.idProduit = idProduit;
    }

    public Situation getSituation() {
        return situation;
    }

    public void setSituation(Situation situation) {
        this.situation = situation;
    }
    
    public String getNumSerie() {
        return numSerie;
    }

    public void setNumSerie(String numSerie) {
        this.numSerie = numSerie;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public int getSeuil() {
        return seuil;
    }

    public void setSeuil(int seuil) {
        this.seuil = seuil;
    }

    public int getPrixNormal() {
        return prixNormal;
    }

    public void setPrixNormal(int prixNormal) {
        this.prixNormal = prixNormal;
    }

    public int getPrixPromotionel() {
        return prixPromotionel;
    }

    public void setPrixPromotionel(int prixPromotionel) {
        this.prixPromotionel = prixPromotionel;
    }

    public Etats getEtat() {
        return etat;
    }

    public void setEtat(Etats etat) {
        this.etat = etat;
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Vente getVente() {
        return vente;
    }

    public void setVente(Vente vente) {
        this.vente = vente;
    }
    
    
}
