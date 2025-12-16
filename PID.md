# Product Idea Document: Mend 2.0 (MVP)
**Internal Codename:** Project Kintsugi
**Status:** Draft for Review
**Date:** October 26, 2023

---

## 1. Problem Statement
Breakups trigger physiological withdrawal symptoms akin to addiction (dopamine and oxytocin dysregulation) combined with an acute loss of identity.

Current solutions fail in two ways:
1.  **Passive Consumption:** Meditation apps (Headspace/Calm) lack the specific context of heartbreak.
2.  **Engagement Traps:** Competitors optimize for time-in-app and community venting, which often reinforces rumination rather than resolving it.

**The Opportunity:** Build a "digital cast" for a broken heart. A tool designed to stabilize the user, guide them through structured processing, and then **become obsolete**.

## 2. Target Audience

### Primary User (The Acute Processor)
* **Profile:** Recently separated (0-3 months).
* **Psychographics:** High-functioning individuals whose productivity and emotional regulation have been disrupted. They view the breakup as a problem to be "solved" or "survived" rather than just endured.
* **Behavior:** Seeking structure to replace the chaos of emotional deregulation.

### Non-Target Users
* **The Chronic Ruminator:** Users looking for a community to perpetually vent without intent to heal.
* **The Dater:** Users looking immediately for a rebound (Tinder/Hinge use case).
* **Crisis Cases:** Users requiring clinical psychiatric intervention or suicide prevention.

## 3. User Jobs to be Done (JTBD)

| Priority | Job | Statement |
| :--- | :--- | :--- |
| **P0** | **Stabilization** | "When I feel the urge to text my ex, I need an immediate friction barrier and alternative action so I don't reset my progress." |
| **P0** | **Processing** | "When I wake up with anxiety, I need a structured, linear guide on what to think about today so I don't spiral." |
| **P1** | **Quantification** | "When I feel like I'm not getting better, I need to see data proving my emotional baseline is improving over time." |

## 4. MVP Scope

The MVP is defined by **subtraction**. We are building a linear workflow, not a content library.

### Included (Core Features)
* **The 30-Day Protocol:** A rigid, linear audio guide (3-5 mins/day). Users cannot skip ahead. Content focuses on CBT (Cognitive Behavioral Therapy) techniques.
* **The Panic Button (SOS):** A single-tap interface for moments of weakness. Delivers a 60-second "circuit breaker" audio recording and a breathing exercise.
* **Ex-Contact Detox Tracker:** A simple counter tracking days since contact. Resetting it requires a deliberate, high-friction confirmation (double modal).
* **Structured Journaling:** Prompts tied directly to that day's audio lesson. No "blank page" journaling.
* **Wellness Check-in:** Daily logging of 3 variables only: Sleep, Mood (1-10), Movement (Y/N).

### Excluded (Strictly Out of Scope)
* **Community/Social Feeds:** No forums. Prevents "pain shopping" and reduces moderation overhead.
* **AI Chatbots/Companions:** We will not simulate intimacy. This creates dependency.
* **Coaching Marketplace:** Operational complexity is too high for MVP.
* **Integrations:** No Spotify, Apple Health, or Calendar integrations.
* **Dating Features:** No "ready to date" modules.

## 5. Success Metrics

### Primary Metric (North Star)
* **Program Completion Rate:** % of users who complete the 30-Day Protocol.
    * *Why:* This proves value delivery.

### Secondary Metrics
* **Panic Button Efficacy:** % of sessions where a user taps "Panic Button" and does *not* leave the app immediately (proxy for not texting the ex).
* **Day-7 Retention:** Critical drop-off point for habit formation.

### Anti-Metrics (Non-Goals)
* **Time Spent in App:** High time-in-app indicates rumination. We want users to do the work and close the app.
* **LTV / Subscription Renewal:** If we do our job, they shouldn't need to renew after month 2 or 3.

## 6. UX Principles

1.  **Clinical Warmth:** The UI should feel like a sterile but comfortable recovery room, not a spa and not a nightclub. High contrast, clean typography.
2.  **Linearity is Peace:** Remove decision fatigue. Do not offer a "library" of content. Offer *one* thing to do today.
3.  **Friction for Safety:** Make destructive actions (resetting a streak, deleting a journal entry) hard. Make constructive actions (playing the daily audio) zero-friction.

## 7. Safety and Trust

* **Data Privacy:** All journal entries are encrypted at rest. We must assume the "Ex" might try to access the user's phone.
    * *Feature:* **"False Bottom" Mode.** A gesture that instantly switches the app interface to a generic "To-Do List" view if the user is interrupted.
* **Crisis Interception:** Natural Language Processing (NLP) on journal entries to detect self-harm keywords. Trigger a modal with local helpline resources immediately.
* **Disclaimer:** Explicit onboarding agreement that Mend is self-help, not medical therapy.

## 8. High-Level Technical Overview

* **Client:** React Native (iOS/Android) for velocity.
* **Backend:** Node.js with GraphQL.
* **Database:** PostgreSQL (structured data for tracking) + Redis (session caching).
* **Audio Delivery:** CDN-backed streaming (Cloudfront + S3). No complex adaptive bitrate needed for speech audio.
* **Security:** Biometric lock (FaceID/TouchID) requirement for app entry.

## 9. MVP Timeline (10 Weeks)

* **Weeks 1-2 (Design & Spec):** Finalize the "30 Day Protocol" script; High-fidelity UI for the "Panic Button" and "Journal."
* **Weeks 3-6 (Core Dev):** Build the audio player, strict progression logic, and local database sync.
* **Weeks 7-8 (Content Integration):** Recording and editing the 30 audio tracks. Ingesting into CMS.
* **Week 9 (QA & Security):** Penetration testing (focus on user privacy).
* **Week 10 (Soft Launch):** TestFlight release to 500 users.

## 10. Open Questions & Risks

* **Risk:** Users may churn if the "Day 1" content doesn't match their specific breakup type (e.g., "I was dumped" vs. "I cheated").
    * *Mitigation:* A light onboarding quiz (3 questions) to branch the user into one of three audio tracks (Blindsided, Mutual, Initiator).
* **Question:** Can we charge upfront for an MVP?
    * *Hypothesis:* Yes. Pain is high willingness-to-pay. We will charge a one-time fee of $29.99 for the "Course" rather than a subscription, aligning revenue with the "Heal and Leave" philosophy.
* **Risk:** "Panic Button" reliance.
    * *Mitigation:* Limit Panic Button usage stats. If used >5 times a day, prompt the user to seek professional help.

---
**Next Step:** Approval of the "Excluded" list to ensure engineering resources are not diverted to social features.