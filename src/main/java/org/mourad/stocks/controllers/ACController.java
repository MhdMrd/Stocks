
package org.mourad.stocks.controllers;

import java.time.Month;
import java.time.Year;
import java.util.Date;
import javax.validation.Valid;
import org.mourad.stocks.dao.IEmployeRepository;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Bilan;
import org.mourad.stocks.entities.BilanJournalier;
import org.mourad.stocks.entities.Categorie;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Vente;
import org.mourad.stocks.services.IAC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@RestController
public class ACController {
    @Autowired
    private IAC AC;
    @Autowired
    private IEmployeRepository employeRepository;
    
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/commandes",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeCommandes(
            @RequestParam(name = "page", defaultValue = "0") int page, 
            @RequestParam(name = "size", defaultValue = "10") int size){
        return AC.listeCommandes(page, size);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/commande",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.POST
    )
    public Commande ajouterCommande(@RequestBody @Valid Commande commande){
        return (commande.getIdCommande()==null)?AC.ajouterCommande(commande):null;
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/commande/{idCommande}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.PUT
    )
    public Commande modifierCommande(@RequestBody @Valid Commande commande,@PathVariable Long idCommande){
        return AC.modifierCommande(commande, idCommande);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/commande/{idCommande}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.DELETE
    )
    public void supprimerCommande(@PathVariable Long idCommande){
        AC.supprimerCommande(idCommande);
    }
    
    /*@Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/achats",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeAchats(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size){
        return AC.findAllAchats(page, size);
    }*/
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/ventes",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeVentes(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size){
        return AC.listeVentes(page, size);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/ventes/de/{idEmploye}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeVentesDe(@PathVariable Long idEmploye, 
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size){
        return AC.listeVentesDe(employeRepository.getOne(idEmploye), page, size);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/employes",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeEmployes(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size   ){
        return AC.listeEmployes(page, size);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/clients",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeClients(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size   ){
        return AC.listeClients(page, size);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/categories",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
    )
    public Page<Object[]> listeCategories(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size   ){
        return AC.listeCategories(page, size);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/vente/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public Vente modifierVente(@RequestBody @Valid Vente vente, @PathVariable Long id){
        return AC.modifierVente(vente, id);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/vente/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public void supprimerVente(@PathVariable Long id){
        AC.supprimerVente(id);
    }
    
    /*@Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/achat/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public Achat modifierAchat(@RequestBody Achat achat, @PathVariable Long id){
        return AC.modifierAchat(achat, id);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/achat/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public void supprimerAchat(@PathVariable Long id){
        AC.supprimerAchat(id);
    }*/
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/produit", 
            method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Produit ajouterProduit(@RequestBody Produit produit){
        return (produit.getIdProduit()==null)? AC.ajouterProduit(produit):null;
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/produit/{idProduit}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public @ResponseBody Produit modifierProduit(@RequestBody @Valid Produit produit, @PathVariable Long idProduit){
        return AC.modifierProduit(produit, idProduit);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/produit/{idProduit}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public void supprimerProduit(@PathVariable Long idProduit){
        AC.supprimerProduit(idProduit);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/categorie", 
            method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Categorie ajouterCategorie(@RequestBody @Valid Categorie categorie){
        return (categorie.getIdCategorie()==null)? AC.ajouterCategorie(categorie):null;
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/categorie/{idCategorie}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public @ResponseBody Categorie modifierCategorie(@RequestBody @Valid Categorie categorie, @PathVariable Long idCategorie){
        return AC.modifierCategorie(categorie, idCategorie);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/categorie/{idCategorie}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public void supprimerCategorie(@PathVariable Long idCategorie){
        AC.supprimerCategorie(idCategorie);
    }
    
    @Secured(value = {"ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/bilan", 
            method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Bilan ajouterBilan(@RequestBody @Valid Bilan bilan){
        return (bilan.getIdBilan()==null)? AC.ajouterBilan(bilan):null;
    }
    
    /*public BilanJournalier genererBilanJournalier(Date date);
    public Bilan genererBilanMensuel(Month month, Year year);
    public Bilan genererBilanAnnuel(Year year);*/
    
}
