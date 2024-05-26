package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Stock;
import com.vita.vitamiel.repository.StockRepository;
import com.vita.vitamiel.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.UUID;

@RestController
@RequestMapping("/stock")
public class StockController {

    @Autowired
    private final StockRepository stockRepository;

    public StockController(StockRepository stockRepository){

        this.stockRepository = stockRepository;
    }

    @Autowired
    private StockService stockService;

    @GetMapping("/quantity")
    public LinkedList<Stock> getAllStock() throws Exception{
        LinkedList<Stock> stocks = stockRepository.findAllStock();

        return stocks;
    }

    @PostMapping("/envoie")
    public Stock   createStock(@RequestBody Stock stock){

        Stock createdStock = stockService.createStock(stock);

        return createdStock;

    }

    @PutMapping("/{id}")
    public Stock updatedStock(@RequestBody Stock stock, @PathVariable UUID id) throws Exception {

        Stock updatedStock = stockService.updateStock(stock,id);

        return updatedStock;
    }

    @DeleteMapping("/{stockId}")
    public String deleteStock(@PathVariable UUID stockId) throws Exception{

        stockService.deleteStock(stockId);

        return  "le stock du produit a été supprimer";
    }

}
