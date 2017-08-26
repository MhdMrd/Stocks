
package org.mourad.stocks.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"employe", "categorie", "dateCommande"})
)
public class Commande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCommande;
    @Column(nullable = false, unique = true)
    private String reference;
    @Column(nullable = false)
    private int quantiteRestante;
    @Column(nullable = false)
    private int quantiteACommander;
    @Column()
    private String observations;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date dateCommande;
    @ManyToOne
    @JoinColumn(name = "employe")
    private Employe employe;
    @ManyToOne
    @JoinColumn(name = "categorie")
    private Categorie categorie;

    public Commande() {
    }
    
    public Commande(String reference, int quantiteRestante, int quantiteACommander, String observations, Date dateCommande, Employe employe, Categorie categorie) {
        this.reference = reference;
        this.quantiteRestante = quantiteRestante;
        this.quantiteACommander = quantiteACommander;
        this.observations = observations;
        this.dateCommande = dateCommande;
        this.employe = employe;
        this.categorie = categorie;
    }

    public Long getIdCommande() {
        return idCommande;
    }

    public void setIdCommande(Long idCommande) {
        this.idCommande = idCommande;
    }
    
    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public int getQuantiteRestante() {
        return quantiteRestante;
    }

    public void setQuantiteRestante(int quantiteRestante) {
        this.quantiteRestante = quantiteRestante;
    }

    public int getQuantiteACommander() {
        return quantiteACommander;
    }

    public void setQuantiteACommander(int quantiteACommander) {
        this.quantiteACommander = quantiteACommander;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }
    
    
    
}
