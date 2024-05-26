package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Job;
import com.vita.vitamiel.model.Stock;

import java.util.UUID;

public interface JobService {

    public Job createjob(Job job);
    public Job findJobById(UUID id) throws Exception;
    public Job updateJob(Job job, UUID id) throws Exception;

    public void deleteJob(UUID id) throws Exception;
}
