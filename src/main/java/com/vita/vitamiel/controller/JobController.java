package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Job;
import com.vita.vitamiel.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

@RestController
@RequestMapping("/job")
public class JobController {
    @Autowired
    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository){

        this.jobRepository = jobRepository;
    }

    @GetMapping("/jobs")
    public LinkedList<Job> getAllJob() throws Exception{

        LinkedList<Job> jobs = jobRepository.findAllJob();

        return jobs;
    }
}
