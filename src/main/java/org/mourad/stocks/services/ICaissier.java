
package org.mourad.stocks.services;

import javax.annotation.Resource;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Vente;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface ICaissier {
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
}
