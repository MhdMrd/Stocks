
package org.mourad.stocks.services;

import javax.transaction.Transactional;
import org.mourad.stocks.dao.IStockDao;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Vente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

/**
 *
 * @author Mourad<mohammadaabdoulahi@gmail.com>
 */
@Service
@Transactional
public class CaissierImpl implements ICaissier{
    @Autowired
    private IStockDao stockDao;

    public void setStockDao(IStockDao stockDao) {
        this.stockDao = stockDao;
    }

    @Override
    public Vente encaisser(Produit produit, Employe employe) {
        return stockDao.encaisser(produit, employe);
    }

    @Override
    public Page<Produit> listeProduitsVendusPar(String matricule, int page, int size) {
        return stockDao.listeProduitsVendusPar(matricule, page, size);
    }

    @Override
    public Page<Object[]> listeProduitsDisponibles(int page, int size) {
        return stockDao.listeProduitsDisponibles(page, size);
    }
    
    @Override
    public Page<Object[]> getClient(Long idClient, int page, int size){
        return stockDao.getClient(idClient, page, size);
    }
    
    /*@Override
    public Page<Object[]> getAchat(Long id, int page, int size){
        return stockDao.getAchat(id, page, size);
    }*/
    
    @Override
    public Page<Object[]> getVente(Long idVente, int page, int size){
        return stockDao.getVente(idVente, page, size);
    }
    
    @Override
    public Client ajouterClient(Client client) {
        return stockDao.ajouterClient(client);
    }

    @Override
    public Client modifierClient(Client client, Long idClient) {
        return stockDao.modifierClient(client, idClient);
    }

    @Override
    public void supprimerClient(Long idClient) {
        stockDao.supprimerClient(idClient);
    }

    @Override
    public Vente ajouterVente(Vente vente) {
        return stockDao.ajouterVente(vente);
    }

    /*@Override
    public Achat ajouterAchat(Achat achat) {
        return stockDao.ajouterAchat(achat);
    }*/
    
}
