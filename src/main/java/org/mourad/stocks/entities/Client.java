
package org.mourad.stocks.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Entity
public class Client implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClient;
    @Column(nullable = false, unique = true)
    private String numCNI;
    @Column(nullable = false)
    private String nom;
    private String prenom;
    @OneToMany(mappedBy = "client")
    private Collection<Vente> ventes;
    public Client() {
    }

    public Client(String numCNI, String nom, String prenom) {
        this.numCNI = numCNI;
        this.nom = nom;
        this.prenom = prenom;
    }

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }
    
    public String getNumCNI() {
        return numCNI;
    }

    public void setNumCNI(String numCNI) {
        this.numCNI = numCNI;
    }

    public Collection<Vente> getVentes() {
        return ventes;
    }

    public void setAchats(Collection<Vente> ventes) {
        this.ventes = ventes;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    
    
    
}
