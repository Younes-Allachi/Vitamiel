package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.LinkedList;
import java.util.UUID;

public interface StockRepository extends JpaRepository<Stock, UUID> {

    @Query ("SELECT s FROM Stock s")
    LinkedList<Stock> findAllStock();


}
