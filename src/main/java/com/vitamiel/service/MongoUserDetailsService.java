package com.vitamiel.service;

import com.vitamiel.domain.User;
import com.vitamiel.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@Primary
public class MongoUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public MongoUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        try {
            // Check if the login is an email address
            if (login.contains("@")) {
                return userRepository
                        .findOneWithAuthoritiesByEmailIgnoreCase(login)
                        .map(user -> createSpringSecurityUser(login, user))
                        .orElseThrow(() -> new UsernameNotFoundException(
                                "User with email " + login + " was not found in the database"));
            }

            // Otherwise, treat it as a username
            String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
            return userRepository
                    .findOneWithAuthoritiesByLogin(lowercaseLogin)
                    .map(user -> createSpringSecurityUser(lowercaseLogin, user))
                    .orElseThrow(() -> new UsernameNotFoundException(
                            "User " + lowercaseLogin + " was not found in the database"));

        } catch (UsernameNotFoundException e) {
            // Log the failure to authenticate
            System.out.println("Login failed for user: " + login);
            throw e;
        }
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String login, User user) {
        // If the user is not activated, throw an exception
        if (!user.isActivated()) {
            throw new UsernameNotFoundException("User " + user.getLogin() + " is not activated");
        }

        List<SimpleGrantedAuthority> grantedAuthorities = user
                .getAuthorities()
                .stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName())) // assuming 'getName' gives the role
                                                                                   // name
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(),
                grantedAuthorities);
    }
}
