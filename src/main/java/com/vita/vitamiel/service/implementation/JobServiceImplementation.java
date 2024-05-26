package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Job;
import com.vita.vitamiel.repository.JobRepository;
import com.vita.vitamiel.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
@Service
public class JobServiceImplementation implements JobService {

    @Autowired
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
        createJob.setStatut(job.getStatut());

        return jobRepository.save(createJob);
    }

    @Override
    public Job findJobById(UUID id) throws Exception {

        Optional<Job> opt = jobRepository.findById(id);

        if(opt.isPresent()){

            return opt.get();
        }
        throw new  Exception("le job avec id suivant n'a pas été trouvé " +id);
    }

    @Override
    public Job updateJob(Job job, UUID id) throws Exception {

        Job oldJob = findJobById(id);

        if(job.getDebut() !=null){
            oldJob.setDebut(job.getDebut());
        }

        if(job.getFin() !=null){

            oldJob.setFin(job.getFin());
        }

        if(job.getStatut() != null){

            oldJob.setStatut(job.getStatut());
        }
        return jobRepository.save(oldJob);
    }

    @Override
    public void deleteJob(UUID id) throws Exception {

        findJobById(id);

        jobRepository.deleteById(id);

    }
}
