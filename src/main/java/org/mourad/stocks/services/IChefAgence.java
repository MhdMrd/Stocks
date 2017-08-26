
package org.mourad.stocks.services;

import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.springframework.data.domain.Page;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IChefAgence {
    public Page<Object[]> getEmploye(Long idEmploye, int page, int size);
    public Commande validerCommande(Commande commande);
    public Employe ajouterEmploye(Employe employe);
    public Employe modifierEmploye(Employe employe, Long idEmploye);
    public void supprimerEmploye(Long idEmploye);
}
