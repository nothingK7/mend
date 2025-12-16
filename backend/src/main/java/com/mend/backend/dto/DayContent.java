package com.mend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DayContent {
    private Integer dayNumber;
    private String title;
    private String audioUrl;
    private String journalPrompt;
}
