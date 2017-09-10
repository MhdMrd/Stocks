
package org.mourad.stocks.services;

import java.time.Month;
import java.time.Year;
import java.util.Date;
import java.util.List;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Bilan;
import org.mourad.stocks.entities.BilanJournalier;
import org.mourad.stocks.entities.Categorie;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Vente;
import org.springframework.data.domain.Page;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IAC {
    public Page<Object[]> listeCommandes(int page, int size);
    public Commande ajouterCommande(Commande commande);
    public Commande modifierCommande(Commande commande,Long idCommande);
    public void supprimerCommande(Long idCommande);
    public Page<Object[]> getCommande(Long idCommande, int page, int size);
    //public Page<Object[]> findAllAchats(int page, int size);
    public Page<Object[]> listeVentes(int page, int size);
    public Page<Object[]> listeVentesDe(Employe employe, int page, int size);
    public Page<Object[]> listeEmployes(int page, int size);
    public Page<Object[]> listeClients(int page, int size);
    public Page<Object[]> listeCategories(int page, int size);
    public Vente modifierVente(Vente vente, Long id);
    public void supprimerVente(Long id);
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
    public Page<Object[]> genererBilanMensuel(String month, String year, int page, int size);
    public Page<Object[]> genererBilanAnnuel(String year, int page, int size);
    
}
