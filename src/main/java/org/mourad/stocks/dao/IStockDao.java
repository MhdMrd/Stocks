
package org.mourad.stocks.dao;

import java.time.Month;
import java.time.Year;
import java.util.Date;
import java.util.List;
import org.mourad.stocks.entities.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IStockDao {
    
    public Vente encaisser(Produit produit, Employe employe);
    //public Employe produireFacture(Produit produit, Employe employe); //4
    public Page<Produit> listeProduitsVendusPar(String matricule, int page, int size);
    public Page<Object[]> listeProduitsDisponibles(int page, int size);
    public Page<Object[]> getClient(Long idClient, int page, int size);
    //public Page<Object[]> getAchat(Long id, int page, int size);
    public Page<Object[]> getVente(Long idVente, int page, int size);
    public Client ajouterClient(Client client);
    public Client modifierClient(Client client, Long idClient);
    public void supprimerClient(Long idClient);
    public Vente ajouterVente(Vente vente);
    //public Achat ajouterAchat(Achat achat);
    /*               _
                    /_\
                     |
                     |
                     |
                                            */
    public Page<Object[]> listeCommandes(int page, int size);
    public Commande ajouterCommande(Commande commande);
    public Commande modifierCommande(Commande commande, Long idCommande);
    public void supprimerCommande(Long idCommande);
    //public Page<Object[]> findAllAchats(int page, int size);
    public Page<Object[]> listeVentes(int page, int size);
    public Page<Object[]> listeVentesEnAttente(int page, int size);
    public Page<Object[]> listeVentesDe(Employe employe, int page, int size);
    public Page<Object[]> listeEmployes(int page, int size);
    public Page<Object[]> listeClients(int page, int size);
    public Page<Object[]> listeCategories(int page, int size);
    public Vente modifierVente(Vente vente, Long id);
    public void supprimerVente(Long id);
    public Vente findVenteByProduitAndEmploye(Produit produit, Employe employe);
    //public Achat modifierAchat(Achat achat, Long id);
    //public void supprimerAchat(Long id);
    public Produit ajouterProduit(Produit produit);
    public Produit modifierProduit(Produit produit, Long idProduit);
    public void supprimerProduit(Long idProduit);
    public Categorie ajouterCategorie(Categorie categorie);
    public Categorie modifierCategorie(Categorie categorie, Long idCategorie);
    public void supprimerCategorie(Long idCategorie);
    public Bilan ajouterBilan(Bilan bilan);
    public BilanJournalier genererBilanJournalier(Date date);
    public Bilan genererBilanMensuel(Month month, Year year);
    public Bilan genererBilanAnnuel(Year year);
    
    /*               _
                    /_\
                     |
                     |
                     |
                                            */
    
    public Page<Object[]> getEmploye(Long idEmploye, int page, int size);
    public Commande validerCommande(Commande commande);
    public Employe ajouterEmploye(Employe employe);
    public Employe modifierEmploye(Employe employe, Long idEmploye);
    public void supprimerEmploye(Long idEmploye);
    
    /*               _
                    /_\
                     |
                     |
                     |
                                            */
    
    public User ajouterUser(User user);
    public User modifierUser(User user, Long idUser);
    public void supprimerUser(Long idUser);
    public Role ajouterRole(Role role);
    public Role modifierRole(Role role, Long idRole);
    public void suprimerRole(Long id);
    public Page<Object[]> getUser(Long idUser, int page, int size);
    public Page<Object[]> getRole(Long idRole, int page, int size);
}
