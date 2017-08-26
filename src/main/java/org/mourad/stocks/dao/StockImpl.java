
package org.mourad.stocks.dao;

import java.time.Month;
import java.time.Year;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Bilan;
import org.mourad.stocks.entities.BilanJournalier;
import org.mourad.stocks.entities.Categorie;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.EtatVente;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Role;
import org.mourad.stocks.entities.Situation;
import org.mourad.stocks.entities.User;
import org.mourad.stocks.entities.Vente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.QueryAnnotation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Service
@Transactional
public class StockImpl implements IStockDao{
    @Autowired
    private IProduitRepository produitRepository;
    @Autowired
    private ICategorieRepository categorieRepository;
    @Autowired
    private IEmployeRepository employeRepository;
    @Autowired
    private IClientRepository clientRepository;
    @Autowired
    private IVenteRepository venteRepository;
    @Autowired
    private ICommandeRepository commandeRepository;
    @Autowired
    private IBilanRepository bilanRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public Vente encaisser(Produit produit, Employe employe) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    
    public Page<Produit> listeProduitsVendusPar(String matricule, int page, int size) {
        Collection<Vente> ventes = employeRepository.findByMatricule(matricule).getVentes();
        return produitRepository.listeProduitsParNumSerie(ventes, new PageRequest(page, size));
    }

    @Override
    public Page<Object[]> listeProduitsDisponibles(int page, int size) {
        return produitRepository.findBySituation(Situation.Disponible, new PageRequest(page, size));
    }
    
    @Override
    public Page<Object[]> getClient(Long idClient, int page, int size){
        return clientRepository.getClients(idClient, new PageRequest(page, size));
    }
    
    /*@Override
    public Page<Object[]> getAchat(Long id, int page, int size){
        return achatRepository.getAchat(id, new PageRequest(page, size));
    }*/
    
    @Override
    public Page<Object[]> getVente(Long idVente, int page, int size){
        return venteRepository.getVente(idVente, new PageRequest(page, size));
    }
    
    @Override
    public Client ajouterClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client modifierClient(Client client, Long idClient) {
        client.setIdClient(idClient);
        return clientRepository.save(client);
    }

    @Override
    public void supprimerClient(Long idClient) {
        clientRepository.deleteById(idClient);
    }

    @Override
    public Vente ajouterVente(Vente vente) {
        return venteRepository.save(vente);
    }

    /*@Override
    public Achat ajouterAchat(Achat achat) {
        return achatRepository.save(achat);
    }*/

    @Override
    public Commande ajouterCommande(Commande commande) {
        return commandeRepository.save(commande);
    }
    
    /*@Override
    public Page<Object[]> findAllAchats(int page, int size){
        return achatRepository.findAllAchats(new PageRequest(page, size));
    }*/
    
    @Override
    public Page<Object[]> listeVentes(int page, int size) {
        return venteRepository.findAllVentes(new PageRequest(page, size));
    }
    
    @Override
    public Page<Object[]> listeVentesEnAttente(int page, int size) {
        return venteRepository.findAllByEtat(EtatVente.Effectuee, new PageRequest(page, size));
    }

    @Override
    public Page<Object[]> listeVentesDe(Employe employe, int page, int size) {
        return venteRepository.findVentesDe(employe.getIdEmploye(), new PageRequest(page, size));
    }

    @Override
    public Page<Object[]> listeEmployes(int page, int size) {
        return employeRepository.findAllEmployes(new PageRequest(page, size));
    }

    @Override
    public Page<Object[]> listeClients(int page, int size) {
        return clientRepository.findAllClients(new PageRequest(page, size));
    }

    @Override
    public Page<Object[]> listeCategories(int page, int size) {
        return categorieRepository.findAllCategories(new PageRequest(page, size));
    }

    @Override
    public Vente modifierVente(Vente vente, Long id) {
        vente.setIdVente(id);
        return venteRepository.save(vente);
    }

    @Override
    public void supprimerVente(Long id) {
        venteRepository.deleteById(id);
    }

    /*@Override
    public Achat modifierAchat(Achat achat, Long id) {
        achat.setIdAchat(id);
        return achatRepository.save(achat);
    }*/

    /*@Override
    public void supprimerAchat(Long id) {
        achatRepository.deleteById(id);
    }*/

    @Override
    public Produit ajouterProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public Produit modifierProduit(Produit produit, Long idProduit) {
        produit.setIdProduit(idProduit);
        return produitRepository.save(produit);
    }

    @Override
    public void supprimerProduit(Long idProduit) {
        produitRepository.deleteById(idProduit);
    }

    @Override
    public Categorie ajouterCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public Categorie modifierCategorie(Categorie categorie, Long idCategorie) {
        categorie.setIdCategorie(idCategorie);
        return categorieRepository.save(categorie);
    }

    @Override
    public void supprimerCategorie(Long idCategorie) {
        categorieRepository.deleteById(idCategorie);
    }

    @Override
    public BilanJournalier genererBilanJournalier(Date date) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Bilan genererBilanMensuel(Month month, Year year) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Bilan genererBilanAnnuel(Year year) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Commande validerCommande(Commande commande) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    @Override
    public Page<Object[]> getEmploye(Long idEmploye, int page, int size){
        return employeRepository.getOneEmploye(idEmploye, new PageRequest(page, size));
    }
    
    @Override
    public Employe ajouterEmploye(Employe employe) {
        return employeRepository.save(employe);
    }

    @Override
    public Employe modifierEmploye(Employe employe, Long idEmploye) {
        employe.setIdEmploye(idEmploye);
        return employeRepository.save(employe);
    }

    @Override
    public void supprimerEmploye(Long idEmploye) {
        employeRepository.deleteById(idEmploye);
    }

    @Override
    public Page<Object[]> listeCommandes(int page, int size) {
        return commandeRepository.findAllCommandes(new PageRequest(page, size));
    }

    @Override
    public Commande modifierCommande(Commande commande, Long idCommande) {
        commande.setIdCommande(idCommande);
        return commandeRepository.save(commande);
    }

    @Override
    public void supprimerCommande(Long idCommande) {
        commandeRepository.deleteById(idCommande);
    }

    @Override
    public Bilan ajouterBilan(Bilan bilan) {
        return bilanRepository.save(bilan);
    }

    @Override
    public Vente findVenteByProduitAndEmploye(Produit produit, Employe employe) {
        return venteRepository.findByProduitAndEmploye(produit, employe);
    }

    @Override
    public User ajouterUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User modifierUser(User user, Long idUser) {
        user.setIdUser(idUser);
        return userRepository.save(user);
    }

    @Override
    public void supprimerUser(Long idUser) {
        userRepository.deleteById(idUser);
    }

    @Override
    public Role ajouterRole(Role role) {
        return roleRepository.saveAndFlush(role);
        
    }

    @Override
    public Role modifierRole(Role role, Long idRole) {
        role.setIdRole(idRole);
        return roleRepository.save(role);
    }

    @Override
    public void suprimerRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Page<Object[]> getUser(Long idUser, int page, int size) {
        return userRepository.getUser(idUser, new PageRequest(page, size));
    }

    @Override
    public Page<Object[]> getRole(Long idRole, int page, int size) {
        return roleRepository.getRole(idRole, new PageRequest(page, size));
    }
    
}
