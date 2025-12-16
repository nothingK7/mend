package com.mend.backend.repository;

import com.mend.backend.model.DailyProgress;
import com.mend.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DailyProgressRepository extends JpaRepository<DailyProgress, UUID> {
    Optional<DailyProgress> findTopByUserAndStatusOrderByDayNumberDesc(User user, DailyProgress.DayStatus status);
}
