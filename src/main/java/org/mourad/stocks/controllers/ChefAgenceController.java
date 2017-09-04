
package org.mourad.stocks.controllers;

import javax.validation.Valid;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.services.IChefAgence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Transactional
@RestController
public class ChefAgenceController {
    @Autowired
    private IChefAgence chefAgence;
    
    
    /*public Commande validerCommande(Commande commande);*/
    
    
    
    @Secured(value = {"ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(value = "/stocks/get/employe/{idEmploye}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET)
    public @ResponseBody Page<Object[]> getClient(@PathVariable Long idEmploye){
        return chefAgence.getEmploye(idEmploye, 0, 5);
    }
    
    @Secured(value = {"ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/add/employe",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.POST
    )
    public Employe ajouterEmploye(@RequestBody @Valid Employe employe){
        return (employe.getIdEmploye()==null)?chefAgence.ajouterEmploye(employe):null;
    }
    
    @Secured(value = {"ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/edit/employe/{idEmploye}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.PUT
    )
    public Employe modifierEmploye(@RequestBody @Valid Employe employe,@PathVariable Long idEmploye){
        return chefAgence.modifierEmploye(employe, idEmploye);
    }
    
    @Secured(value = {"ROLE_ChefAgence", "ROLE_Admin"})
    @RequestMapping(
            value = "/stocks/delete/employe/{idEmploye}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.DELETE
    )
    public void supprimerEmploye(@PathVariable Long idEmploye){
        chefAgence.supprimerEmploye(idEmploye);
    }
}
