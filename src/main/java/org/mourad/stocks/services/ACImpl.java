
package org.mourad.stocks.services;

import java.time.Month;
import java.time.Year;
import java.util.Date;
import java.util.List;
import org.mourad.stocks.dao.IStockDao;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Bilan;
import org.mourad.stocks.entities.BilanJournalier;
import org.mourad.stocks.entities.Categorie;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Vente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Service
@Transactional
public class ACImpl implements IAC{
    @Autowired
    private IStockDao stockDao;

    public void setStockDao(IStockDao stockDao) {
        this.stockDao = stockDao;
    }

    @Override
    public Page<Object[]> listeCommandes(int page, int size) {
        return stockDao.listeCommandes(page, size);
    }

    @Override
    public Commande ajouterCommande(Commande commande) {
        return stockDao.ajouterCommande(commande);
    }

    @Override
    public Commande modifierCommande(Commande commande, Long idCommande) {
        return stockDao.modifierCommande(commande, idCommande);
    }

    @Override
    public void supprimerCommande(Long idCommande) {
        stockDao.supprimerCommande(idCommande);
    }
    
    @Override
    public Page<Object[]> getCommande(Long idCommande, int page, int size){
        return stockDao.getCommande(idCommande, page, size);
    }
    @Override
    public Page<Object[]> listeVentes(int page, int size) {
        return stockDao.listeVentes(page, size);
    }

    /*@Override
    public Page<Object[]> findAllAchats(int page, int size){
        return stockDao.findAllAchats(page, size);
    }*/
    @Override
    public Page<Object[]> listeVentesDe(Employe employe, int page, int size) {
        return stockDao.listeVentesDe(employe, page, size);
    }

    @Override
    public Page<Object[]> listeEmployes(int page, int size) {
        return stockDao.listeEmployes(page, size);
    }

    @Override
    public Page<Object[]> listeClients(int page, int size) {
        return stockDao.listeClients(page, size);
    }

    @Override
    public Page<Object[]> listeCategories(int page, int size) {
        return stockDao.listeCategories(page, size);
    }

    @Override
    public Vente modifierVente(Vente vente, Long id) {
        return stockDao.modifierVente(vente, id);
    }

    @Override
    public void supprimerVente(Long id) {
        stockDao.supprimerVente(id);
    }

    /*@Override
    public Achat modifierAchat(Achat achat, Long id) {
        return stockDao.modifierAchat(achat, id);
    }*/

    /*@Override
    public void supprimerAchat(Long id) {
        stockDao.supprimerAchat(id);
    }*/

    @Override
    public Produit ajouterProduit(Produit produit) {
        return stockDao.ajouterProduit(produit);
    }

    @Override
    public Produit modifierProduit(Produit produit, Long idProduit) {
        return stockDao.modifierProduit(produit, idProduit);
    }

    @Override
    public void supprimerProduit(Long idProduit) {
        stockDao.supprimerProduit(idProduit);
        
    }

    @Override
    public Categorie ajouterCategorie(Categorie categorie) {
       return stockDao.ajouterCategorie(categorie);
    }

    @Override
    public Categorie modifierCategorie(Categorie categorie, Long idCategorie) {
        return stockDao.modifierCategorie(categorie, idCategorie);
    }

    @Override
    public void supprimerCategorie(Long idCategorie) {
        stockDao.supprimerCategorie(idCategorie);
    }

    @Override
    public Bilan ajouterBilan(Bilan bilan) {
        return stockDao.ajouterBilan(bilan);
    }

    @Override
    public BilanJournalier genererBilanJournalier(Date date) {
        return stockDao.genererBilanJournalier(date);
    }

    @Override
    public Bilan genererBilanMensuel(Month month, Year year) {
        return stockDao.genererBilanMensuel(month, year);
    }

    @Override
    public Bilan genererBilanAnnuel(Year year) {
        return stockDao.genererBilanAnnuel(year);
    }
    
}
