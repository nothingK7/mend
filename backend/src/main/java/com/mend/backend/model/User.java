package com.mend.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users") // 'user' is a reserved keyword in Postgres
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime startDate;

    @Enumerated(EnumType.STRING)
    private ProtocolTrack protocolTrack;

    public enum ProtocolTrack {
        BLINDSIDED, MUTUAL, INITIATOR
    }
}
