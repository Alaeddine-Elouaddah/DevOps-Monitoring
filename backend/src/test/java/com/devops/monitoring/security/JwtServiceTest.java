package com.devops.monitoring.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JwtServiceTest {

    @Test
    void generateToken_acceptsPlainTextSecretWithHyphens() {
        JwtService jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey",
                "dev-development-secret-key-for-jwt-signing-change-in-production-must-be-at-least-256-bits");
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 86_400_000L);
        UserDetails user = User.withUsername("test@example.com")
                .password("password")
                .authorities("USER")
                .build();

        String token = jwtService.generateToken(user);

        assertEquals("test@example.com", jwtService.extractUsername(token));
    }
}
