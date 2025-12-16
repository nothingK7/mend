package com.mend.backend.service;

import com.mend.backend.dto.DayContent;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ContentService {

    private final Map<Integer, DayContent> curriculum = new HashMap<>();

    public ContentService() {
        // Initialize with sample content for MVP
        curriculum.put(1, new DayContent(1, "The Shock", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "Write the story of the breakup exactly as it happened."));
        curriculum.put(2, new DayContent(2, "Detox", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "List 5 triggers that make you want to text them."));
        curriculum.put(3, new DayContent(3, "Withdrawal", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "Describe the physical sensations in your body right now."));
        // ... populate more as needed
    }

    public DayContent getDayContent(Integer day) {
        return curriculum.getOrDefault(day, new DayContent(day, "Coming Soon", "", "Free write."));
    }
}
