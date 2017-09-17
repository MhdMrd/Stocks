
package org.mourad.stocks.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import org.springframework.boot.autoconfigure.web.ResourceProperties;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */

@Entity
public class Categorie implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategorie;
    @Column(nullable = false, unique = true)
    private String nom;
    @Column(nullable = false)
    private int seuil;
    @Column(nullable = false)
    private int prixNormal;
    @Column(nullable = false)
    private int prixPromotionel;
    @Column(nullable = false)
    private int destocke;
    @Column(nullable = false)
    private int quantiteDisponible;
    private int quantiteDefectueux;
    private String remarque;
    @OneToMany(mappedBy = "categorie", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Produit> produits;
    @OneToMany(mappedBy = "categorie")
    private Collection<Commande> commandes;
    @OneToMany(mappedBy = "categorie")
    private Collection<Bilan> bilan;
    
    public Categorie() {
    }

    public Categorie(String nom, int quantiteDisponible) {
        this.nom = nom;
        this.quantiteDisponible = quantiteDisponible;
    }

    public Categorie(String nom, int seuil, int prixNormal, int prixPromotionel, int destocke, int quantiteDisponible, int quantiteDefectueux, String remarque) {
        this.nom = nom;
        this.seuil = seuil;
        this.prixNormal = prixNormal;
        this.prixPromotionel = prixPromotionel;
        this.destocke = destocke;
        this.quantiteDisponible = quantiteDisponible;
        this.quantiteDefectueux = quantiteDefectueux;
        this.remarque = remarque;
    }

    public int getDestocke() {
        return destocke;
    }

    public void setDestocke(int destocke) {
        this.destocke = destocke;
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
    
    public Long getIdCategorie() {
        return idCategorie;
    }

    public void setIdCategorie(Long idCategorie) {
        this.idCategorie = idCategorie;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getQuantiteDisponible() {
        return quantiteDisponible;
    }

    public void setQuantiteDisponible(int quantiteDisponible) {
        this.quantiteDisponible = quantiteDisponible;
    }

    public int getQuantiteDefectueux() {
        return quantiteDefectueux;
    }

    public void setQuantiteDefectueux(int quantiteDefectueux) {
        this.quantiteDefectueux = quantiteDefectueux;
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public Collection<Produit> getProduits() {
        return produits;
    }

    public void setProduits(List<Produit> produits) {
        this.produits = produits;
    }

    public Collection<Commande> getCommandes() {
        return commandes;
    }

    public void setCommandes(Collection<Commande> commandes) {
        this.commandes = commandes;
    }

    public Collection<Bilan> getBilan() {
        return bilan;
    }

    public void setBilan(Collection<Bilan> bilan) {
        this.bilan = bilan;
    }
    
    
    
}
