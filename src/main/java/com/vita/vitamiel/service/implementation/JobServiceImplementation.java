package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Job;
import com.vita.vitamiel.repository.JobRepository;
import com.vita.vitamiel.service.JobService;

import java.util.UUID;

public class JobServiceImplementation implements JobService {

    private JobRepository jobRepository;
    @Override
    public Job createjob(Job job) {

        Job  createJob = new Job();

        createJob.setTitle(job.getTitle());
        createJob.setLieu(job.getLieu());
        createJob.setEmail(job.getEmail());
        createJob.setTelephone(job.getTelephone());
        createJob.setPays(job.getPays());
        createJob.setVille(job.getVille());
        createJob.setDebut(job.getDebut());
        createJob.setFin(job.getFin());
        createJob.setType(job.getType());
        createJob.setContrat(job.getContrat());
        createJob.setLangue(job.getLangue());
        createJob.setEducation(job.getEducation());
        createJob.setSecteur(job.getSecteur());
        createJob.setStatut(job.isStatut());

        return jobRepository.save(createJob);
    }

    @Override
    public Job findJobById(UUID id) throws Exception {
        return null;
    }

    @Override
    public Job updateJob(Job job, UUID id) throws Exception {
        return null;
    }

    @Override
    public void deleteJob(UUID id) throws Exception {

    }
}