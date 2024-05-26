package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Stock;

import java.util.UUID;

public interface StockService {

    public Stock createStock(Stock stock);
    public Stock findStockById(UUID id) throws Exception;
    public Stock updateStock(Stock stock, UUID id) throws Exception;

    public void deleteStock(UUID id) throws Exception;
}
