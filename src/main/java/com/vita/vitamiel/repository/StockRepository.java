package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StockRepository extends JpaRepository<Stock, UUID> {

    Stock  findStocksById(UUID id);
}
