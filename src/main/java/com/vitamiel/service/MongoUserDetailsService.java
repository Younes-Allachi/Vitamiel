package com.vitamiel.service;

import com.vitamiel.domain.User;
import com.vitamiel.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // Injecting the UserRepository (MongoDB repository)
    public MongoUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the user by username (or email, depending on your application)
        User user = userRepository.findOneByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Ensure the user is activated
        if (!user.isActivated()) {
            throw new UsernameNotFoundException("User " + user.getLogin() + " is not activated");
        }

        return new org.springframework.security.core.userdetails.User(
                user.getLogin(),  // Username
                user.getPassword(), // Password
                mapAuthorities(user) // Authorities
        );
    }

    // Helper method to map authorities (roles)
    private Set<SimpleGrantedAuthority> mapAuthorities(User user) {
        // Assuming 'user.getAuthorities()' returns a Set of Authority objects
        return user.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName())) // assuming 'getName' gives the String name of the role
                .collect(Collectors.toSet());
    }
}
