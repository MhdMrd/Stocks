package org.mourad.stocks;

import java.time.Month;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.apache.tomcat.util.security.MD5Encoder;
import org.mourad.stocks.dao.ICategorieRepository;
import org.mourad.stocks.dao.IClientRepository;
import org.mourad.stocks.dao.IProduitRepository;
import org.mourad.stocks.dao.IRoleRepository;
import org.mourad.stocks.dao.IStockDao;
import org.mourad.stocks.dao.IUserRepository;
import org.mourad.stocks.entities.Achat;
import org.mourad.stocks.entities.Bilan;
import org.mourad.stocks.entities.Categorie;
import org.mourad.stocks.entities.Client;
import org.mourad.stocks.entities.Commande;
import org.mourad.stocks.entities.Employe;
import org.mourad.stocks.entities.EtatVente;
import org.mourad.stocks.entities.Etats;
import org.mourad.stocks.entities.Produit;
import org.mourad.stocks.entities.Role;
import org.mourad.stocks.entities.Situation;
import org.mourad.stocks.entities.User;
import org.mourad.stocks.entities.Vente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

@SpringBootApplication
public class StocksApplication implements CommandLineRunner{
    @Autowired
    private IProduitRepository produitRepository;
    @Autowired
    private ICategorieRepository categorieRepository;
    @Autowired
    private IClientRepository clientRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRoleRepository roleRepository;
    @Autowired
    private IStockDao stockDao;
	public static void main(String[] args) {
		SpringApplication.run(StocksApplication.class, args);
	}

    @Override
    public void run(String... strings) throws Exception {
        String numSerie = "";
        
        Client client = stockDao.ajouterClient(new Client("IMPL11DFS", "Mourad", "Mohammad"));
        Client client1 = stockDao.ajouterClient(new Client("IMPL111DFD", "Youssfi", "Hassan"));
        Client client2 = stockDao.ajouterClient(new Client("IMPL111DDS", "Hamza", "Mohammad"));
        Categorie c;
        c = stockDao.ajouterCategorie(new Categorie("Modems IMPL",5, 50, 10,0,50, 20, "Pour le moment ça va."));
        c.setIdCategorie(c.getIdCategorie());
        Categorie s = stockDao.ajouterCategorie(new Categorie("Smartphones IMPL",10,0, 50, 10,50,20, "RAS ici"));
        s.setIdCategorie(s.getIdCategorie());
        Categorie sim  = stockDao.ajouterCategorie(new Categorie("SIM IMPL",15, 50, 10,0,50,20, "Ici non plus"));
        sim.setIdCategorie(sim.getIdCategorie());
        //Produit p=new Produit("12845Ab IMPL","WiFi",5,50,60 Etats.Bon, Situation.Disponible,c);
        Produit p = new Produit("12845Ab IMPL", "Wifi",Etats.Bon, Situation.Disponible, "RAS", c);
        produitRepository.save(p);
        Produit p1=new Produit("12915Ab", "WiFi haut Débit", Etats.Bon, Situation.Disponible, numSerie, c);
        
        produitRepository.save(p1);
        Produit p2=new Produit("GSGS85SD", "Camtel CT", Etats.Bon, Situation.Disponible, numSerie, s);
        
        produitRepository.save(p2);
        Produit p3=new Produit(numSerie+"OJ", "CT Phone",Etats.Bon, Situation.Disponible, numSerie, s);
        
        produitRepository.save(p3);
        p=new Produit("IMPL98", "SIM GSM", Etats.Bon, Situation.Disponible, numSerie, sim);
        
        stockDao.ajouterProduit(p);
        p=new Produit("IMPL54GJ", "SIM 3G", Etats.Bon, Situation.Disponible, numSerie, sim);
        
        stockDao.ajouterProduit(p);
        Employe ep = new Employe("IMPL EMP 01", "Mourad", "Mohammad", "Caissier");
        Employe e = stockDao.ajouterEmploye(ep);
        Employe ep1 = new Employe("IMPLEMP02", "Abd", "B", "Chef AC");
        Employe e1 = stockDao.ajouterEmploye(ep1);
        Employe ep2 = new Employe("IMPL EMP 03", "Mohammad", "A", "Chef d'agence");
        Employe e2 = stockDao.ajouterEmploye(ep2);
        Employe ep3 = new Employe("IMPL EMP 04", "Yuri", "P", "Agence Commerciale");
        Employe e3 = stockDao.ajouterEmploye(ep3);
        stockDao.ajouterEmploye(new Employe("IMPL EMP 05", "Ikta", "J", "RR"));
        /*
        Achat a =stockDao.ajouterAchat(new Achat(client, p, new Date()));
        Achat a1 =stockDao.ajouterAchat(new Achat(client1, p3, new Date()));
        Achat a2 =stockDao.ajouterAchat(new Achat(client2, p2, new Date()));
        */
        Vente v = stockDao.ajouterVente(new Vente(e3, p3,client2, new Date(),Boolean.TRUE, EtatVente.Effectuee));
        Vente v1 = stockDao.ajouterVente(new Vente(e1, p1, client, new Date(),Boolean.FALSE, EtatVente.En_attente));
        Vente v2 = stockDao.ajouterVente(new Vente(e1, p2, client1, new Date(),Boolean.FALSE, EtatVente.Effectuee));
        
        Commande com = stockDao.ajouterCommande(new Commande("REF IMPL 01", 10, 25, "RAS",new Date(), e3, sim));
        Commande com1 = stockDao.ajouterCommande(new Commande("REF IMPL 02", 10, 25, "RAS",new Date(), e1, c));
        Commande com2 = stockDao.ajouterCommande(new Commande("REF IMPL 03", 10, 25, "RAS",new Date(), e1, s));
        
        Bilan b;
        b = stockDao.ajouterBilan(new Bilan(sim, Month.APRIL.toString(), Year.now().toString(), 10, 5, 2, sim.getPrixNormal(), 3, sim.getPrixPromotionel(), 1, 1, 8) /*Bilan(sim, Month.MAY.toString(), Year.now().toString(), 15, 12)*/);
        
        Bilan b1 = stockDao.ajouterBilan(new Bilan(sim, Month.SEPTEMBER.toString(), Year.now().toString(), 72, 12, 65, sim.getPrixNormal(), 15, sim.getPrixPromotionel(), 15, 20, 70));
        Bilan b2 = stockDao.ajouterBilan(new Bilan(sim, Month.JANUARY.toString(), Year.now().toString(), 77, 25, 82, sim.getPrixNormal(), 10, sim.getPrixPromotionel(), 41, 21, 75));
        Bilan b3 = stockDao.ajouterBilan(new Bilan(sim, Month.DECEMBER.toString(), Year.now().toString(), 86, 20, 12, sim.getPrixNormal(), 34, sim.getPrixPromotionel(), 18, 89, 25));
        Bilan b4 = stockDao.ajouterBilan(new Bilan(c, Month.SEPTEMBER.toString(), Year.now().toString(), 20, 87, 35, sim.getPrixNormal(), 24, sim.getPrixPromotionel(), 12, 78, 35));
        Bilan b5 = stockDao.ajouterBilan(new Bilan(c, Month.JANUARY.toString(), Year.now().toString(), 25, 78, 15, sim.getPrixNormal(), 4, sim.getPrixPromotionel(), 97, 35, 13));
        Bilan b6 = stockDao.ajouterBilan(new Bilan(c, Month.DECEMBER.toString(), Year.now().toString(), 96, 45, 32, sim.getPrixNormal(), 86, sim.getPrixPromotionel(), 89, 12, 45));
        Bilan b7 = stockDao.ajouterBilan(new Bilan(s, Month.SEPTEMBER.toString(), Year.now().toString(), 15, 83, 26, sim.getPrixNormal(), 28, sim.getPrixPromotionel(), 12, 32, 77));
        Bilan b8 = stockDao.ajouterBilan(new Bilan(s, Month.JANUARY.toString(), Year.now().toString(), 100, 45, 95, sim.getPrixNormal(), 96, sim.getPrixPromotionel(), 75, 23, 15));
        Bilan b9 = stockDao.ajouterBilan(new Bilan(s, Month.DECEMBER.toString(), Year.now().toString(), 82, 46, 78, sim.getPrixNormal(), 72, sim.getPrixPromotionel(), 43, 18, 84));
        System.out.println(b.getAnnee());
        System.out.println("----------------Liste des produits de la catégorie:"+c.getNom()+"----------------");
        /*List<Vente> liste=stockDao.listeVentes();
        liste.forEach(l->{
            System.out.println(l.getProduit().getDesignation()+"-----"+l.getEmploye().getNom());
//        });*/
        Md5PasswordEncoder md = new Md5PasswordEncoder();
        User u =stockDao.ajouterUser(new User("Yuri", md.encodePassword("11121998", ""), ep3));
        User u1 = stockDao.ajouterUser(new User("Yod", md.encodePassword("11121998", ""), ep2));
        User u2 = stockDao.ajouterUser(new User("Mourad", md.encodePassword("Camtel@2017", ""), ep));
        
        Role r = stockDao.ajouterRole(new Role("Caissier", u2));
        Role r1 = stockDao.ajouterRole(new Role("CA", u2));
        Role r2 = stockDao.ajouterRole(new Role("ChefAgence", u2));
        Role r3 = stockDao.ajouterRole(new Role("Boss", u2));
        Role r4 = stockDao.ajouterRole(new Role("Admin", u2));
    }
}
