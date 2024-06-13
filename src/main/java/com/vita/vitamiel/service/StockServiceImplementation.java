package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Stock;
import com.vita.vitamiel.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class StockServiceImplementation implements StockService {

    @Autowired
    private StockRepository stockRepository;
    @Override
    public Stock createStock(Stock stock) {

        Stock createStock = new Stock();
        createStock.setNom(stock.getNom());
        createStock.setQuantite(stock.getQuantite());
        createStock.set
        return stockRepository.save(createStock);
    }

    @Override
    public Stock findStockById(UUID id) throws Exception {

        Optional<Stock> opt = stockRepository.findById(id);

        if(opt.isPresent()){
            return  opt.get();
        }
        throw  new Exception("le stock ne contient pas cette id"+id);

    }

    @Override
    public Stock updateStock(Stock stock, UUID id) throws Exception {

        Stock  oldStock =  findStockById(id);

        if(stock.getQuantite() !=0){

            oldStock.setQuantite(stock.getQuantite());

        }

        return stockRepository.save(oldStock);

    }

    @Override
    public void deleteStock(UUID id) throws Exception {

        findStockById(id);

        stockRepository.deleteById(id);
    }

}
