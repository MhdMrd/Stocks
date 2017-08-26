
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Categorie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface ICategorieRepository extends JpaRepository<Categorie, Long>{
    @Query("SELECT c.idCategorie, c.nom, c.quantiteDisponible, c.quantiteDefectueux, c.remarque FROM Categorie c")
    public Page<Object[]> findAllCategories(Pageable pageable);
    @Query("SELECT c.idCategorie as idCategorie, c.nom as nom, c.quantiteDisponible as quantiteDisponible, c.quantiteDefectueux as quantiteDefectueux, c.remarque as remarque FROM Categorie c WHERE c.idCategorie=:x")
    public Page<Object[]> getCategorie(@Param("x")Long idCategorie, Pageable pageable);
    //public Categorie getById(Long idCategorie);
}
