package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.LinkedList;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {

    @Query("SELECT j FROM Job j")
    LinkedList<Job> findAllJob();
}
