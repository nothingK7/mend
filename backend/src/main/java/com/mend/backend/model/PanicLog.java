package com.mend.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "panic_logs")
@Data
@NoArgsConstructor
public class PanicLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    private LocalDateTime triggeredAt;

    private Integer durationSeconds;

    @Enumerated(EnumType.STRING)
    private Outcome outcome;

    public enum Outcome {
        STAYED, LEFT_APP
    }
}
