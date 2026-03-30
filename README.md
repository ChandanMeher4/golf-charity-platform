# 🚀 Golf Charity Subscription Platform - MVP Build

## ⏱️ Time Constraint Strategy (48 Hours)
Given the tight deadline, I prioritized establishing:
- A rock-solid data foundation  
- Secure authentication  
- A complete user loop  

Over external integrations that introduce significant edge cases (like Stripe webhooks).

---

## 🛠️ What I Built (The MVP)

### 🧱 Architecture
- **Next.js App Router**
- **Tailwind CSS**
- **Shadcn UI**
- **Supabase** (PostgreSQL + Auth)

---

### ⚡ Core Feature: Real-time Score Management
- Implemented the **"Rolling 5 Scores"** logic  
- Built directly using **Next.js Server Actions**
- Ensures **data integrity** without requiring background cron jobs  

---

### ❤️ Charity Integration
- Designed a **relational database schema**
- Links **user profiles → charities**
- Supports **custom contribution percentages**

---

### 🎯 Draw System
- Built a functional **Admin Panel**
- Safely generates and commits:
  - Secure
  - Random  
  draw results to the database  

---

## 🧪 What I Mocked (And How I'd Build It)

### 💳 Subscriptions
- Currently implemented as a **mock toggle**

**Implementation Plan:**
- Integrate **Stripe Checkout**
- Use **webhooks** to listen for:
  - `customer.subscription.updated`
- Securely toggle the `is_subscribed` flag in Supabase  

---

### 🧠 Algorithmic Draws
- Currently uses **random selection**

**Implementation Plan:**
- Write a **PostgreSQL SQL function** (or Edge Function)
- Query the `scores` table
- Aggregate score frequencies
- Apply a **weighted randomizer**
- Generate the final 5 numbers  

---
