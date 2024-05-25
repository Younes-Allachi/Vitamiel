package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Stock;
import com.vita.vitamiel.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImplementation implements StockService {

    @Autowired
    private StockRepository stockRepository;
    @Override
    public Stock createStock(Stock stock) {

        Stock createStock = new Stock();
        createStock.setNom(stock.getNom());
        createStock.setPrix(stock.getPrix());
        createStock.setQuantite(stock.getQuantite());
        return stockRepository.save(createStock);
    }
}
