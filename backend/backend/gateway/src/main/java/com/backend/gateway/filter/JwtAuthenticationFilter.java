package com.backend.gateway.filter;

import com.backend.gateway.util.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.function.Predicate;

@Component
public class JwtAuthenticationFilter implements GatewayFilter {
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        // Define endpoints that do not require authentication
        final List<String> apiEndpoints = List.of("/api/auth/signin", "/api/auth/savePassword","/api/auth/forgetpassword","/api/auth/signup", "/eureka");

        Predicate<ServerHttpRequest> isApiSecured = r -> apiEndpoints.stream()
                .noneMatch(uri -> r.getURI().getPath().contains(uri));

        // If the request is for a secured endpoint
        if (isApiSecured.test(request)) {
            // Check if the "Authorization" header exists and is valid
            if (authMissing(request)) {
                return onError(exchange, "Authorization header is missing");
            }

            String token = getTokenFromHeader(request);
            if (token == null) {
                return onError(exchange, "Invalid Authorization header format");
            }

            // Validate the JWT token
            try {
                jwtUtil.validateJwtToken(token);
            } catch (Exception e) {
                return onError(exchange, "Invalid or expired token");
            }
        }

        return chain.filter(exchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, String errorMessage) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add("error-message", errorMessage); // Custom error message
        return response.setComplete();
    }

    private boolean authMissing(ServerHttpRequest request) {
        return !request.getHeaders().containsKey("Authorization") ||
                request.getHeaders().getOrEmpty("Authorization").isEmpty();
    }

    private String getTokenFromHeader(ServerHttpRequest request) {
        String authHeader = request.getHeaders().getOrEmpty("Authorization").get(0);
        if (authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}