/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.mourad.stocks.dao;

import org.mourad.stocks.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Mouhamad mourad
 */
public interface IClientRepository extends JpaRepository<Client, Long>{
    @Query("SELECT c.idClient, c.numCNI, c.nom, c.prenom FROM Client c")
    public Page<Object[]> findAllClients(Pageable pageable);
    @Query("SELECT c.idClient, c.numCNI, c.nom, c.prenom FROM Client c WHERE c.idClient=:x")
    public Page<Object[]> getClients(@Param("x") Long idClient, Pageable pageable);
}
