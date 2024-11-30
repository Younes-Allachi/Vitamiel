package com.vitamiel.service;

import com.vitamiel.config.Constants;
import com.vitamiel.domain.Authority;
import com.vitamiel.domain.User;
import com.vitamiel.repository.AuthorityRepository;
import com.vitamiel.repository.UserRepository;
import com.vitamiel.security.AuthoritiesConstants;
import com.vitamiel.security.SecurityUtils;
import com.vitamiel.service.dto.AdminUserDTO;
import com.vitamiel.service.dto.UserDTO;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.security.RandomUtil;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;
    private final MailService mailService;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        AuthorityRepository authorityRepository,
        MailService mailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.mailService = mailService;
    }

    public Optional<User> activateRegistration(String key) {
        LOG.debug("Activating user for activation key {}", key);
        return userRepository
            .findOneByActivationKey(key)
            .map(user -> {
                // activate given user for the registration key.
                user.setActivated(true);
                user.setActivationKey(null);
                LOG.debug("Activated user: {}", user);
                return user;
            });
    }

    public Optional<User> completePasswordReset(String newPassword, String key) {
        LOG.debug("Reset user password for reset key {}", key);
        return userRepository
            .findOneByResetKey(key)
            .filter(user -> user.getResetDate().isAfter(Instant.now().minus(1, ChronoUnit.DAYS)))
            .map(user -> {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setResetKey(null);
                user.setResetDate(null);
                userRepository.save(user);  // Make sure the user is saved after the change
                LOG.debug("Password reset successfully for user: {}", user.getLogin());
                return user;
            });
    }

    public Optional<User> requestPasswordReset(String mail) {
        mail = mail.trim();  // Remove leading/trailing spaces
        System.out.println("Searching for email: " + mail);
        return userRepository
            .findOneByEmailIgnoreCase(mail)
            .filter(user -> {
                System.out.println("User found: " + user);
                return user.isActivated();
            })
            .map(user -> {
                user.setResetKey(RandomUtil.generateResetKey());
                user.setResetDate(Instant.now());
                return user;
            })
            .map(user -> userRepository.save(user));  
    }
    

    public User registerUser(AdminUserDTO userDTO, String password) {

        System.out.println("user DTO:"+userDTO);
        // Check if the login exists
        userRepository
            .findOneByLogin(userDTO.getLogin().toLowerCase())
            .ifPresent(existingUser -> {
                boolean removed = removeNonActivatedUser(existingUser);
                if (!removed) {
                    throw new UsernameAlreadyUsedException();
                }
            });
    
        // Check if the email exists
        userRepository
            .findOneByEmailIgnoreCase(userDTO.getEmail())
            .ifPresent(existingUser -> {
                boolean removed = removeNonActivatedUser(existingUser);
                if (!removed) {
                    throw new EmailAlreadyUsedException();
                }
            });
    
        // Create a new user and set properties
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setLogin(userDTO.getLogin().toLowerCase());
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        if (userDTO.getEmail() != null) {
            newUser.setEmail(userDTO.getEmail().toLowerCase());
        }
        newUser.setImageUrl(userDTO.getImageUrl());
        newUser.setLangKey(userDTO.getLangKey());
        newUser.setActivated(true);
        newUser.setActivationKey(RandomUtil.generateActivationKey());
    
        // Set auditing fields (e.g., createdBy, createdDate)
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElse("system");
        newUser.setCreatedBy(currentUserLogin);
        newUser.setCreatedDate(Instant.now());
        newUser.setLastModifiedBy(currentUserLogin);
        newUser.setLastModifiedDate(Instant.now());
    
        // Create authorities set
        Set<Authority> authorities = new HashSet<>();
    
        // Find or create the required authorities (ROLE_USER)
        Optional<Authority> userAuthorityOpt = authorityRepository.findById(AuthoritiesConstants.USER);
        Authority userAuthority = userAuthorityOpt.orElseGet(() -> authorityRepository.save(new Authority().name(AuthoritiesConstants.USER)));
    
        authorities.add(userAuthority);
    
        // Set the authorities for the new user
        newUser.setAuthorities(authorities);
    
        // Save the new user to the repository
        userRepository.save(newUser);
        LOG.debug("Created Information for User: {}", newUser);
    
        // Send activation email
        //mailService.sendActivationEmail(newUser);
    
        return newUser;
    }
    
    private boolean removeNonActivatedUser(User existingUser) {
        if (existingUser.isActivated()) {
            return false;
        }
        userRepository.delete(existingUser); // No need for flush() here
        return true;
    }


    public User createUser(AdminUserDTO userDTO) {
        User user = new User();
        user.setLogin(userDTO.getLogin().toLowerCase());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail().toLowerCase());
        }
        user.setImageUrl(userDTO.getImageUrl());
        if (userDTO.getLangKey() == null) {
            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }

        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setActivated(true);

        // Set auditing fields
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElse("system");
        user.setCreatedBy(currentUserLogin);
        user.setCreatedDate(Instant.now());
        user.setLastModifiedBy(currentUserLogin);
        user.setLastModifiedDate(Instant.now());

        if (userDTO.getAuthorities() != null) {
            Set<Authority> authorities = userDTO
                .getAuthorities()
                .stream()
                .map(authorityRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
            user.setAuthorities(authorities);
        }
        userRepository.save(user);
        LOG.debug("Created Information for User: {}", user);
        return user;
    }

    public Optional<AdminUserDTO> updateUser(AdminUserDTO userDTO) {
        return Optional.of(userRepository.findById(userDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(user -> {
                user.setLogin(userDTO.getLogin().toLowerCase());
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                if (userDTO.getEmail() != null) {
                    user.setEmail(userDTO.getEmail().toLowerCase());
                }
                user.setImageUrl(userDTO.getImageUrl());
                user.setActivated(userDTO.isActivated());
                user.setLangKey(userDTO.getLangKey());
                user.setDeliveryAddress(userDTO.getDeliveryAddress());

                // Set lastModifiedBy and lastModifiedDate for auditing
                String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElse("system");
                user.setLastModifiedBy(currentUserLogin);
                user.setLastModifiedDate(Instant.now());

                Set<Authority> managedAuthorities = user.getAuthorities();
                managedAuthorities.clear();
                userDTO
                    .getAuthorities()
                    .stream()
                    .map(authorityRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .forEach(managedAuthorities::add);

                userRepository.save(user);
                LOG.debug("Changed Information for User: {}", user);
                return user;
            })
            .map(AdminUserDTO::new);
    }

    public void deleteUser(String login) {
        userRepository
            .findOneByLogin(login)
            .ifPresent(user -> {
                userRepository.delete(user);
                LOG.debug("Deleted User: {}", user);
            });
    }

    public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl, String deliveryAddress) {
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(user -> {
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setDeliveryAddress(deliveryAddress);
                if (email != null) {
                    user.setEmail(email.toLowerCase());
                }
                user.setLangKey(langKey);
                user.setImageUrl(imageUrl);

                // Set lastModifiedBy and lastModifiedDate for auditing
                String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElse("system");
                user.setLastModifiedBy(currentUserLogin);
                user.setLastModifiedDate(Instant.now());

                userRepository.save(user);
                LOG.debug("Changed Information for User: {}", user);
            });
    }

    @Transactional
public void changePassword(String currentClearTextPassword, String newPassword) {
    System.out.println("newPassword COMING FOR RESET PASSWORD: " + newPassword);

    SecurityUtils.getCurrentUserLogin()
        .flatMap(userRepository::findOneByLogin)
        .ifPresent(user -> {
            String currentEncryptedPassword = user.getPassword();
            if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                throw new InvalidPasswordException();
            }
            String encryptedPassword = passwordEncoder.encode(newPassword);
            System.out.println("Encrypted Password COMING FOR RESET PASSWORD: " + encryptedPassword);

            user.setPassword(encryptedPassword);  // Set the new encrypted password

            // Save the updated user object to MongoDB
            userRepository.save(user);
            System.out.println("Password updated for user: " + user.getLogin());

            // Optional: Clear the current security context to force re-authentication
            SecurityContextHolder.clearContext();
            
            LOG.debug("Changed password for User: {}", user);
        });
}


    @Transactional(readOnly = true)
    public Page<AdminUserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(AdminUserDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllPublicUsers(Pageable pageable) {
        return userRepository.findAllByIdNotNullAndActivatedIsTrue(pageable).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userRepository.findOneWithAuthoritiesByLogin(login);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedUsers() {
        userRepository
            .findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
            .forEach(user -> {
                LOG.debug("Deleting not activated user {}", user.getLogin());
                userRepository.delete(user);
            });
    }

    @Transactional(readOnly = true)
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).toList();
    }
}
