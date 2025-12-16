package com.mend.backend.service;

import com.mend.backend.dto.DayContent;
import com.mend.backend.model.DailyProgress;
import com.mend.backend.model.JournalEntry;
import com.mend.backend.model.User;
import com.mend.backend.model.WellnessLog;
import com.mend.backend.repository.DailyProgressRepository;
import com.mend.backend.repository.JournalEntryRepository;
import com.mend.backend.repository.UserRepository;
import com.mend.backend.repository.WellnessLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProtocolService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DailyProgressRepository dailyProgressRepository;
    
    @Autowired
    private JournalEntryRepository journalEntryRepository;
    
    @Autowired
    private WellnessLogRepository wellnessLogRepository;

    @Autowired
    private com.mend.backend.security.EncryptionUtil encryptionUtil;

    @Autowired
    private ContentService contentService;

    public DayContent getCurrentDayContent(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        
        // Logic: Find last completed day, next is today.
        // Simplified for MVP: Just count completed days + 1
        Optional<DailyProgress> lastCompleted = dailyProgressRepository.findTopByUserAndStatusOrderByDayNumberDesc(user, DailyProgress.DayStatus.COMPLETED);
        
        int nextDay = lastCompleted.map(dp -> dp.getDayNumber() + 1).orElse(1);
        
        // Ensure the day is actually unlocked (time-based logic could go here, for MVP assuming immediate unlock of next day)
        return contentService.getDayContent(nextDay);
    }

    @Transactional
    public void completeDay(String email, Integer dayNumber, String journalContent, WellnessLog wellnessLog) {
        User user = userRepository.findByEmail(email).orElseThrow();

        if (journalContent != null && !journalContent.isEmpty()) {
            JournalEntry entry = new JournalEntry();
            entry.setUser(user); // Assuming JournalEntry has setUser, not setUserId
            entry.setDayNumber(dayNumber);
            // Encrypt Content
            entry.setContentEncrypted(encryptionUtil.encrypt(journalContent));
            entry.setCreatedAt(java.time.LocalDateTime.now());
            journalEntryRepository.save(entry);
        }
        // 2. Save Wellness
        wellnessLog.setUser(user);
        wellnessLogRepository.save(wellnessLog);

        // 3. Mark Progress
        DailyProgress progress = new DailyProgress();
        progress.setUser(user);
        progress.setDayNumber(dayNumber);
        progress.setStatus(DailyProgress.DayStatus.COMPLETED);
        progress.setCompletedAt(LocalDateTime.now());
        
        dailyProgressRepository.save(progress);
    }
}
