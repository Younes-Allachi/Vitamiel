package com.vitamiel.service;

import com.vitamiel.domain.Email;
import com.vitamiel.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final EmailRepository emailRepository;

    @Autowired
    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public Email saveEmail(Email email) {
        System.out.println("SAVE EMAIL"+email);
        return emailRepository.save(email);
    }
}
