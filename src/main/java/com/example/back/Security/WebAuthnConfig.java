package com.example.back.Security;

import com.example.back.Repository.RegistrationRepository;
import com.yubico.webauthn.RelyingParty;
import com.yubico.webauthn.data.RelyingPartyIdentity;
import com.yubico.webauthn.data.ByteArray;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class WebAuthnConfig {

    @Value("${authn.hostname}") // Charge le hostname depuis application.properties
    private String hostname;

    @Value("${authn.display}") // Charge le display depuis application.properties
    private String display;

    @Value("${authn.origin}") // Charge les origins depuis application.properties
    private Set<String> origin;

    // Configuration de RelyingParty
    @Bean
    public RelyingParty relyingParty(RegistrationRepository registrationRepository) {
        RelyingPartyIdentity relyingPartyIdentity = RelyingPartyIdentity.builder()
                .id(hostname)
                .name(display)
                .build();

        return RelyingParty.builder()
                .identity(relyingPartyIdentity)
                .credentialRepository(registrationRepository)
                .origins(origin)
                .build();
    }

    // Convertisseur pour ByteArray
    @Converter(autoApply = true)
    public static class ByteArrayAttributeConverter implements AttributeConverter<ByteArray, byte[]> {

        public byte[] convertToDatabaseColumn(ByteArray byteArray) {
            return byteArray.getBytes();
        }

        public ByteArray convertToEntityAttribute(byte[] bytes) {
            return new ByteArray(bytes);
        }
    }
}