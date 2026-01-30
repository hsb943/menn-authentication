# MENN – Full-Stack Authentication System (Next.js)

A production-style **authentication and user account system** built with **Next.js App Router**, focused on clean separation of concerns, extensibility, and real-world patterns.

---

## 1. Overview

### 1.1 What This Project Is
- A **frontend-first authentication system**
- Covers **login, registration, email verification, password reset, profile**
- Built using **Next.js App Router architecture**

### 1.2 What This Project Is NOT
- ❌ Not a toy demo
- ❌ Not backend-heavy
- ❌ Not framework-locked to auth providers like Firebase/Auth0

---

## 2. Tech Stack

### 2.1 Core Technologies
1. **Next.js (App Router)**
2. **React**
3. **Redux Toolkit**
4. **Yup (Validation)**
5. **Custom Auth Services (API abstraction)**

### 2.2 Why These Choices
- **Next.js App Router**
  - Modern routing model
  - Server + client separation
  - Future-proof

- **Redux Toolkit**
  - Predictable global state
  - Scales better than Context for auth
  - Dev-friendly debugging

- **Yup**
  - Declarative schema validation
  - Single source of truth for forms

---

## 3. High-Level Architecture
<img width="319" height="882" alt="whole-architecture" src="https://github.com/user-attachments/assets/e21a0f09-5240-4cf2-a2ad-5140aa4246cc" />


### 3.1 Architecture Style
- **Layered Frontend Architecture**
- Clear separation between:
  - UI
  - State
  - Business logic
  - API layer

### 3.2 Data Flow
1. UI Components
2. Validation Layer
3. Redux Store
4. Service Layer (API)
5. Backend (external)

---

## 4. Project Structure

### 4.1 Root Level
menn/
├── src/
├── public/
├── middleware.js
├── package.json


---

### 4.2 `src/app` – Routing & Pages

src/app/
├── layout.js
├── page.jsx
├── globals.css
├── account/
│ ├── login/
│ ├── register/
│ ├── verify-email/
│ ├── reset-password-link/
│ └── reset-password-confirm/
├── user/
│ ├── profile/
│ └── change-password/


#### Why This Structure
- Mirrors **real product URLs**
- Keeps auth flows isolated
- Easier feature ownership

---

### 4.3 `src/components` – Reusable UI

components/
├── Navbar.jsx
├── UserSidebar.jsx
├── LoadingIndicator.jsx


**Why**
- No page-specific logic
- Pure presentation components
- Reusable across routes

---

### 4.4 `src/lib` – Core Logic
lib/
├── store.js
├── services/
│ └── auth.js


#### Responsibilities
- Redux store configuration
- API communication
- Zero UI concerns

---

### 4.5 `src/validation` – Form Schemas
validation/
└── schemas.js


**Why**
- Centralized validation
- Prevents duplication
- Easy schema evolution

---

## 5. Middleware

### 5.1 `middleware.js`
- Route-level protection
- Authentication checks
- Redirect logic

**Why**
- Prevents unauthorized access early
- Cleaner page components

---

## 6. Authentication Features

### 6.1 Implemented Flows
1. Login
2. Registration
3. Email verification
4. Password reset (link + confirm)
5. Profile access
6. Password change

### 6.2 Design Decisions
- Token handling abstracted
- UI never talks directly to APIs
- Stateless frontend assumption

---

## 7. State Management

### 7.1 Redux Usage
- Global auth state
- User session handling
- Async request tracking

### 7.2 Why Redux (Not Context)
- Predictable updates
- Easier debugging
- Scales with app complexity

---

## 8. Validation Strategy

### 8.1 Yup Schemas
- Email format
- Password rules
- Form-level constraints

**Why**
- Keeps components clean
- One change updates all forms

---

## 9. Styling

### 9.1 CSS Strategy
- Global styles in `globals.css`
- Component-scoped styles where needed

**Why**
- Simple
- Maintainable
- No over-engineering

---

## 10. Extensibility

### 10.1 Easy to Add
- OAuth providers
- Backend swap (REST → GraphQL)
- Role-based access
- Token refresh logic

### 10.2 Why This Matters
- Real products evolve
- This structure survives growth

---

## 11. How to Run Locally

```bash
npm install
npm run dev
```

---

## 12. App runs on:
http://localhost:3000

---

## 13. Screenshots
Browser access
<img width="1164" height="622" alt="user-interface-browser" src="https://github.com/user-attachments/assets/6c8e047b-9738-4897-94b1-a9480d668bb0" />

Github Actions Workflow
<img width="1920" height="752" alt="workflow" src="https://github.com/user-attachments/assets/2c0232bd-aca7-4fca-81b4-73675d4fef16" />




