package com.vitamiel.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDatabaseConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(MongoDatabaseConfiguration.class);

    private final String mongoUri = "mongodb://localhost:27017/vitamiel"; // Update as needed

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "vitamiel");
    }

    // Method to check if the MongoDB connection is established
    public void verifyMongoConnection() {
        try (MongoClient client = mongoClient()) {
            MongoDatabase database = client.getDatabase("vitamiel");
            database.listCollections(); // Just an operation to trigger connection
            System.out.println("In mongodb connection"); // Corrected System.out.println()
            LOG.info("Successfully connected to MongoDB at {}", mongoUri);
        } catch (Exception e) {
            System.out.println("Failed mongodb connection"); // Corrected System.out.println()
            LOG.error("Failed to connect to MongoDB: {}", e.getMessage());
        }
    }
}
