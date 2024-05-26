package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Job;
import com.vita.vitamiel.repository.JobRepository;
import com.vita.vitamiel.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;

@RestController
@RequestMapping("/job")
public class JobController {
    @Autowired
    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository){

        this.jobRepository = jobRepository;
    }

    @Autowired
    private JobService jobService;

    @GetMapping("/jobs")
    public LinkedList<Job> getAllJob() throws Exception{

        LinkedList<Job> jobs = jobRepository.findAllJob();

        return jobs;
    }

    @PostMapping("/createJob")
    public Job createJob(@RequestBody Job job){

        Job createdJob = jobService.createjob(job);

        return  createdJob;
    }

}
