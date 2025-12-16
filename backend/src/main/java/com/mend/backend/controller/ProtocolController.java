package com.mend.backend.controller;

import com.mend.backend.dto.CompleteDayRequest;
import com.mend.backend.dto.DayContent;
import com.mend.backend.model.WellnessLog;
import com.mend.backend.service.ProtocolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/protocol")
public class ProtocolController {

    @Autowired
    private ProtocolService protocolService;

    @GetMapping("/current")
    public ResponseEntity<DayContent> getCurrentDay(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(protocolService.getCurrentDayContent(email));
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeDay(Authentication authentication, @RequestBody CompleteDayRequest request) {
        String email = authentication.getName();
        
        WellnessLog wellness = new WellnessLog();
        wellness.setDate(request.getDate() != null ? request.getDate() : java.time.LocalDate.now());
        wellness.setSleepHours(request.getSleepHours());
        wellness.setMoodScore(request.getMoodScore());
        wellness.setMovement(request.getMovement());

        protocolService.completeDay(email, request.getDayNumber(), request.getJournalContent(), wellness);
        
        return ResponseEntity.ok("Day completed successfully");
    }
}
