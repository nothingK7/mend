package com.mend.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "detox_trackers")
@Data
@NoArgsConstructor
public class DetoxTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private LocalDateTime lastContactDate;

    private Integer resetCount;

    @Transient // Computed property, not stored
    public long getCurrentStreakDays() {
        if (lastContactDate == null) return 0; // Or calculate from user start
        return java.time.temporal.ChronoUnit.DAYS.between(lastContactDate, LocalDateTime.now());
    }
}
