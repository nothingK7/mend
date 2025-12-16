package com.mend.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "daily_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "day_number"})
})
@Data
@NoArgsConstructor
public class DailyProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "day_number", nullable = false)
    private Integer dayNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayStatus status;

    private LocalDateTime completedAt;

    public enum DayStatus {
        LOCKED, UNLOCKED, COMPLETED
    }
}
