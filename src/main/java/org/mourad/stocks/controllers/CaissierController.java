
package org.mourad.stocks.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.mourad.stocks.dao.ICategorieRepository;
import org.mourad.stocks.dao.IClientRepository;
import org.mourad.stocks.dao.IEmployeRepository;
import org.mourad.stocks.dao.IProduitRepository;
import org.mourad.stocks.dao.IUserRepository;
import org.mourad.stocks.dao.IVenteRepository;
import org.mourad.stocks.entities.*;
import org.mourad.stocks.services.ICaissier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
@Transactional
@RestController
public class CaissierController {
    @Autowired
    private ICaissier caissier;
    @Autowired
    private IVenteRepository venteRepository;
    @Autowired
    private IEmployeRepository employeRepository;
    @Autowired
    private IProduitRepository produitRepository;
    @Autowired
    private IClientRepository clientRepository;
    @Autowired
    private ICategorieRepository categorieRepository;
    @Autowired
    private IUserRepository userRepository;
    
    
    @RequestMapping(value = "/getUserAuthenticated",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public Page<Object[]> getUserAuthenticated(HttpServletRequest httpServletRequest){
        HttpSession httpSession = httpServletRequest.getSession();
        SecurityContext securityContext = (SecurityContext) httpSession.getAttribute("SPRING_SECURITY_CONTEXT");
        String username = securityContext.getAuthentication().getName();
        List<String>  roles = new ArrayList<String>();
        String roless = securityContext.getAuthentication().getAuthorities().toString();
        System.out.println(roless);
        //System.out.println("Principal="+username);
        Long idUser = Long.parseLong(username);
        return userRepository.getUser(idUser, new PageRequest(0, 5));
    }
    
    @Secured(value = {"ROLE_Caissier"})
    @RequestMapping(value = "/stocks/encaisser",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public Vente encaisser(@RequestBody Produit produit, @RequestBody @Valid Employe employe){
        if(venteRepository.findByProduitAndEmploye(produit, employe)!=null){
            return null;
        }
        return caissier.encaisser(produit, employe);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/listes/ventes/par/{matricule}", 
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public Page<Produit> listeProduitsVendusPar(@PathVariable String matricule, 
            @RequestParam(name = "page", defaultValue = "0") int page, 
            @RequestParam(name = "size", defaultValue = "10") int size){
        return caissier.listeProduitsVendusPar(matricule, page, size);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/listes/produits/disponibles",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> listeProduitsDisponibles(
            @RequestParam(name = "page", defaultValue = "0") int page, 
            @RequestParam(name = "size", defaultValue = "10") int size){
        return caissier.listeProduitsDisponibles(page, size);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/get/categorie/{idCategorie}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> getCategorie(@PathVariable Long idCategorie){
        return categorieRepository.getCategorie(idCategorie, new PageRequest(0, 5));
    }
    
    /*@Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/get/achat/{idAchat}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> getAchat(@PathVariable Long idAchat){
        return caissier.getAchat(idAchat, 0,5);
    }*/
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/get/vente/{idVente}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> getVente(@PathVariable Long idVente){
        return caissier.getVente(idVente, 0,5);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/find/categorie/{idCategorie}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Categorie findById(@PathVariable Long idCategorie){
        return categorieRepository.getOne(idCategorie);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/get/client/{idClient}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> getClient(@PathVariable Long idClient){
        return caissier.getClient(idClient, 0, 5);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/client", 
            method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Client ajouterClient(@RequestBody @Valid Client client){
        return (client.getIdClient()==null)? caissier.ajouterClient(client):null;
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/client/{idClient}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public @ResponseBody Client modifierClient(@RequestBody @Valid Client client, @PathVariable Long idClient){
            return caissier.modifierClient(client, idClient);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/client/{idClient}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public void supprimerClient(@PathVariable Long idClient){
        caissier.supprimerClient(idClient);
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/vente",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public Vente ajouterVente(@RequestBody @Valid Vente vente){
        return (vente.getIdVente()==null)? caissier.ajouterVente(vente):null;
    }
    
    @Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/get/produit/{idProduit}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> getProduit(@PathVariable Long idProduit){
        return caissier.getProduit(idProduit, 0, 10);
    }
    
    /*@Secured(value = {"ROLE_Caissier", "ROLE_CA", "ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/achat",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public Achat ajouterAchat(@RequestBody @Valid Achat achat){
        return (achat.getIdAchat()==null)? caissier.ajouterAchat(achat):null;
    }*/
}
