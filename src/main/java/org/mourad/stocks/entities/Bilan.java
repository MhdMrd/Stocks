
package org.mourad.stocks.entities;

import java.io.Serializable;
import java.time.Month;
import java.time.Year;
import java.util.Collection;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"annee", "mois"})
)
public class Bilan implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBilan;
    @ManyToOne
    @JoinColumn(name = "categorie")
    private Categorie categorie;
    private String mois;
    private String annee;
    private int quantiteDebut;
    private int quantiteFin;

    public Bilan() {
    }

    public Bilan(Categorie categorie, String mois, String annee, int quantiteDebut, int quantiteFin) {
        this.categorie = categorie;
        this.mois = mois;
        this.annee = annee;
        this.quantiteDebut = quantiteDebut;
        this.quantiteFin = quantiteFin;
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
