package com.vitamiel.service;

import com.vitamiel.domain.ContactForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import tech.jhipster.config.JHipsterProperties;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * Service for sending contact form emails asynchronously.
 */
@Service
public class UserEmailService {

    private static final Logger LOG = LoggerFactory.getLogger(UserEmailService.class);

    private final JHipsterProperties jHipsterProperties;
    private final JavaMailSender javaMailSender;
    private final MessageSource messageSource;
    private final SpringTemplateEngine templateEngine;

    public UserEmailService(
        JHipsterProperties jHipsterProperties,
        JavaMailSender javaMailSender,
        MessageSource messageSource,
        SpringTemplateEngine templateEngine
    ) {
        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }

    /**
     * Send the contact form submission email asynchronously to the Vitamiel support.
     *
     * @param contactForm The contact form data submitted by the user.
     */
    @Async
    public void sendContactFormEmail(ContactForm contactForm) {
        LOG.debug("Sending contact form email to '{}'", jHipsterProperties.getMail().getFrom());

        try {
            Locale locale = Locale.forLanguageTag("en");
            Context context = new Context(locale);
            context.setVariable("contact", contactForm); // Passing the contact form details to the template

            // Using Thymeleaf to process the email content
            String content = templateEngine.process("mail/contactEmail", context);

            // Sending the email using the sendEmail method
            this.sendEmailSync("vitamiel.be@gmail.com", contactForm.getSubject(), content, false, true);
        } catch (Exception e) {
            LOG.error("Error while sending the contact email: ", e);
        }
    }

    /**
     * Send the email synchronously (helper method).
     *
     * @param to          The recipient email address.
     * @param subject     The subject of the email.
     * @param content     The content of the email.
     * @param isMultipart Flag to determine if the email is multipart.
     * @param isHtml      Flag to determine if the email content is HTML.
     */
    private void sendEmailSync(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        LOG.debug(
            "Sending email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content
        );

        // Prepare the email message using Spring's MimeMessage
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);

            // Send the email
            javaMailSender.send(mimeMessage);
            LOG.debug("Sent contact email to '{}'", to);
        } catch (MailException | MessagingException e) {
            LOG.warn("Email could not be sent to '{}'", to, e.getMessage());
        }
    }
}
