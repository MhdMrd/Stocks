
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Bilan;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
public interface IBilanRepository extends JpaRepository<Bilan, Long>{
    
}
