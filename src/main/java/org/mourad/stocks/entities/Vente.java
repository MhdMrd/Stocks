
package org.mourad.stocks.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Entity
@Table(
        uniqueConstraints = {
            @UniqueConstraint(columnNames = {"employe", "produit"}),
            @UniqueConstraint(columnNames = {"employe", "produit", "dateVente"})
        }
)
public class Vente implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVente;
    @ManyToOne
    @JoinColumn(name="employe")
    private Employe employe;
    @OneToOne
    @JoinColumn(name = "produit", unique = true)
    private Produit produit;
    @ManyToOne
    @JoinColumn(name = "client")
    private Client client;
    private Date dateVente;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EtatVente etat;

    public Vente() {
    }

    public Vente(Employe employe, Produit produit, Client client, Date dateVente, EtatVente etat) {
        this.employe = employe;
        this.produit = produit;
        this.client = client;
        this.dateVente = dateVente;
        this.etat = etat;
    }
    
    public Vente(Employe employe, Produit produit, Date dateVente, EtatVente etat) {
        this.employe = employe;
        this.produit = produit;
        this.dateVente = dateVente;
        this.etat = etat;
    }

    public Long getIdVente() {
        return idVente;
    }

    public void setIdVente(Long idVente) {
        this.idVente = idVente;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Date getDateVente() {
        return dateVente;
    }

    public void setDateVente(Date dateVente) {
        this.dateVente = dateVente;
    }
    
    public EtatVente getEtat() {
        return etat;
    }

    public void setEtat(EtatVente etat) {
        this.etat = etat;
    }

    
}
