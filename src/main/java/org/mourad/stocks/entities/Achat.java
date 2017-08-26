
package org.mourad.stocks.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
/*
@Table(
        uniqueConstraints ={
            @UniqueConstraint(columnNames = {"client", "produit"}),
            @UniqueConstraint(columnNames = {"client", "produit", "dateAchat"})
        }
)*/
public class Achat implements Serializable{
    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)*/
    private Long idAchat;
    /*@ManyToOne
    @JoinColumn(name = "client")*/
    private Client client;
    /*@OneToOne
    @JoinColumn(name = "produit")*/
    private Produit produit;
    /*@Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)*/
    private Date dateAchat;

    public Achat(Client client, Produit produit, Date dateAchat) {
        this.client = client;
        this.produit = produit;
        this.dateAchat = dateAchat;
    }
    
    public Achat() {
    }

    public Long getIdAchat() {
        return idAchat;
    }

    public void setIdAchat(Long idAchat) {
        this.idAchat = idAchat;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Date getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(Date dateAchat) {
        this.dateAchat = dateAchat;
    }

    
}
