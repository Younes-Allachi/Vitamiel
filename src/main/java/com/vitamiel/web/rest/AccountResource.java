package com.vitamiel.web.rest;

import com.vitamiel.domain.ContactForm;
import com.vitamiel.domain.User;
import com.vitamiel.repository.UserRepository;
import com.vitamiel.security.SecurityUtils;
import com.vitamiel.service.MailService;
import com.vitamiel.service.UserEmailService;
import com.vitamiel.service.UserService;
import com.vitamiel.service.dto.AdminUserDTO;
import com.vitamiel.service.dto.PasswordChangeDTO;
import com.vitamiel.web.rest.errors.*;
import com.vitamiel.web.rest.vm.KeyAndPasswordVM;
import com.vitamiel.web.rest.vm.ManagedUserVM;
import jakarta.validation.Valid;
import java.util.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private static final Logger LOG = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;

    private final UserEmailService userEmailService;

    public AccountResource(UserRepository userRepository, UserService userService, MailService mailService,UserEmailService userEmailService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.userEmailService=userEmailService;
    }

    @PostMapping("/contact")
    @ResponseStatus(HttpStatus.OK)
    public void sendContact(@Valid @RequestBody ContactForm contactForm) {
        LOG.debug("Received contact form submission: {}", contactForm);
        
        // Call the service to send the email asynchronously
        userEmailService.sendContactFormEmail(contactForm);
    }


     /**
     * {@code POST  /register} : register multiple users.
     *
     * @param managedUserVMList the list of managed user View Models.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/users/register/batch")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerMultipleUsers(@Valid @RequestBody List<ManagedUserVM> managedUserVMList) {
        System.out.println("Received user list: " + managedUserVMList); 
        if (managedUserVMList == null || managedUserVMList.isEmpty()) {
            throw new IllegalArgumentException("User list cannot be empty");
        }

        // Iterate over the list of users and register each one
        for (ManagedUserVM managedUserVM : managedUserVMList) {
            // Validate the password for each user
            if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
                throw new InvalidPasswordException();
            }

            // Set login from email and other necessary fields
            managedUserVM.setLogin(managedUserVM.getEmail());
            managedUserVM.setActivated(true);

            // Register the user
            User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());

            System.out.println("User created" +user);
            // Send an activation email for each registered user
            //mailService.sendActivationEmail(user);
        }
    }


    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {

        System.out.println("Managed User for registration:"+managedUserVM);
        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        managedUserVM.setLogin(managedUserVM.getEmail());
        managedUserVM.setActivated(true);
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        mailService.sendActivationEmail(user);
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be activated.
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this activation key");
        }
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    public AdminUserDTO getAccount() {
        return userService
            .getUserWithAuthorities()
            .map(AdminUserDTO::new)
            .orElseThrow(() -> new AccountResourceException("User could not be found"));
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {
        String userLogin = SecurityUtils.getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.orElseThrow().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(
            userDTO.getFirstName(),
            userDTO.getLastName(),
            userDTO.getEmail(),
            userDTO.getLangKey(),
            userDTO.getImageUrl(),
            userDTO.getDeliveryAddress()
        );
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        System.out.println("passwordChangeDto COMING FOR RESET PASSWORD: " + passwordChangeDto);

        if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("mail");  // Extract email from the request body
        System.out.println("EMAIL COMING FOR RESET PASSWORD: " + email);

        Optional<User> user = userService.requestPasswordReset(email);
        System.out.println("User after checking"+user);
        if (user.isPresent()) {
            mailService.sendPasswordResetMail(user.orElseThrow());
        } else {
            // Pretend the request has been successful to prevent checking which emails really exist
            // but log that an invalid attempt has been made
            LOG.warn("Password reset requested for non existing mail in /account/reset-password/init");
        }
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {

        System.out.println("Key and Password:"+keyAndPassword);
        if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this reset key");
        }
    }

    private static boolean isPasswordLengthInvalid(String password) {
        return (
            StringUtils.isEmpty(password) ||
            password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH ||
            password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH
        );
    }
}
