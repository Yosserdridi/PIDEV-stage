package com.example.back.config;

import com.example.back.entities.Jury;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class JuryConfig {
    @Bean
    public List<Jury> jurysDisponibles() {
        return new ArrayList<>();  // Or initialize with your list of juries
    }
}
