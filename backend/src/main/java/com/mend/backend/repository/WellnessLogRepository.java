package com.mend.backend.repository;

import com.mend.backend.model.WellnessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WellnessLogRepository extends JpaRepository<WellnessLog, UUID> {
}
