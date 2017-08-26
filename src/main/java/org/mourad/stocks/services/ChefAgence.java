
package org.mourad.stocks.services;

import org.mourad.stocks.dao.IStockDao;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
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
public class ChefAgence implements IChefAgence{
    @Autowired
    private IStockDao stockDao;

    public void setStockDao(IStockDao stockDao) {
        this.stockDao = stockDao;
    }
    
    @Override
    public Commande validerCommande(Commande commande) {
        return stockDao.validerCommande(commande);
    }
    
    @Override
    public Page<Object[]> getEmploye(Long idEmploye, int page, int size){
        return stockDao.getEmploye(idEmploye, page, size);
    }
    
    @Override
    public Employe ajouterEmploye(Employe employe) {
        return stockDao.ajouterEmploye(employe);
    }

    @Override
    public Employe modifierEmploye(Employe employe, Long idEmploye) {
        return stockDao.modifierEmploye(employe, idEmploye);
    }

    @Override
    public void supprimerEmploye(Long idEmploye) {
        stockDao.supprimerEmploye(idEmploye);
    }
    
}
