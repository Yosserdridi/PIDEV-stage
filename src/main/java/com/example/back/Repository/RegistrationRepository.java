package com.example.back.Repository;

import com.example.back.entities.User;
import com.yubico.webauthn.CredentialRepository;
import com.yubico.webauthn.RegisteredCredential;
import com.yubico.webauthn.data.ByteArray;
import com.yubico.webauthn.data.PublicKeyCredentialDescriptor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface RegistrationRepository extends JpaRepository<User, Long>, CredentialRepository {
    User findByUsername(String username);

    Set<PublicKeyCredentialDescriptor> getCredentialIdsForUsername(String username);


    Optional<ByteArray> getUserHandleForUsername(String username);

    Optional<String> getUsernameForUserHandle(ByteArray userHandle);
    Optional<RegisteredCredential> lookup(ByteArray credentialId, ByteArray userHandle);

    Set<RegisteredCredential> lookupAll(ByteArray credentialId);
}