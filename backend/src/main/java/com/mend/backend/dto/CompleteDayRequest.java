package com.mend.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CompleteDayRequest {
    private Integer dayNumber;
    private String journalContent;
    
    // Wellness Data
    private Double sleepHours;
    private Integer moodScore;
    private Boolean movement;
    private LocalDate date;
}
