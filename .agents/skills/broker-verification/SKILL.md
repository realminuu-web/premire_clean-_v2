---
name: broker-verification
description: Domain rules and workflow for certified real estate broker onboarding, document upload (VWorld, business card, office photo), admin approval, and daily 3-match limit enforcement.
---

# Broker Onboarding & Quota Control Specification

## 1. Registration Flow & Document Proof
- **Applicant Fields**:
  - Name, Phone, Broker Office Name (`agent_office_name`), Registration Number (`agent_license_num`), Assigned Region (`region_dong = '다산동'`).
- **Required Verification Uploads**:
  - 1) 브이월드(VWorld) 부동산 중개업 조회 화면 캡처
  - 2) 공인중개사 명함 사진
  - 3) 중개사무소 외부 간판/전경 사진
- **Storage**: Supabase Storage bucket `broker-docs` (Private bucket with signed URLs for admin view only).
- **Default State**: `is_verified = false`. Pending admin manual approval via Supabase Table Editor or Admin panel.

## 2. Daily Matching Quota (하루 최대 3회 수락 제한)
- **Constraint**: To prevent monopoly cherry-picking by aggressive brokers, an active broker can accept at most **3 new match requests per calendar day (KST)**.
- **Enforcement**:
  - Check count of `matches` created by `agent_id` where `created_at >= CURRENT_DATE AT TIME ZONE 'Asia/Seoul'`.
  - If count >= 3, disable the accept button with badge: `[오늘 수락 한도(3/3회) 초과]`.
