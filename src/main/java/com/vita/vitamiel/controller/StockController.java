package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Stock;
import com.vita.vitamiel.repository.StockRepository;
import com.vita.vitamiel.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;

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
}
