package com.mend.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mend.backend.dto.AuthRequest;
import com.mend.backend.dto.CompleteDayRequest;
import com.mend.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProtocolIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void shouldUnlockNextDayAfterCompletion() throws Exception {
        // 1. Signup & Login
        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("protocol@test.com");
        authRequest.setPassword("password");

        MvcResult signupResult = mockMvc.perform(post("/api/v1/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String token = objectMapper.readValue(signupResult.getResponse().getContentAsString(), Map.class).get("token").toString();
        String bearerToken = "Bearer " + token;

        // 2. Get Current Day (Should be day 1)
        mockMvc.perform(get("/api/v1/protocol/current")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dayNumber").value(1));

        // 3. Complete Day 1
        CompleteDayRequest completeRequest = new CompleteDayRequest();
        completeRequest.setDayNumber(1);
        completeRequest.setJournalContent("I felt okay today.");
        completeRequest.setSleepHours(7.5);
        completeRequest.setMoodScore(6);
        completeRequest.setMovement(true);

        mockMvc.perform(post("/api/v1/protocol/complete")
                        .header("Authorization", bearerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(completeRequest)))
                .andExpect(status().isOk());

        // 4. Get Current Day (Should now be day 2)
        mockMvc.perform(get("/api/v1/protocol/current")
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dayNumber").value(2));
    }
}
