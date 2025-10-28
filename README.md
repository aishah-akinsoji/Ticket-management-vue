# FixMate — Ticket Management System (Vue.js Version)

Welcome to the **Vue.js** implementation of the FixMate Ticket Management Web App!  
This version fulfills all the core features, design consistency, and authentication requirements outlined in the multi-framework challenge (React, Vue, Twig).  

---

##  Features Overview

### Landing Page
- Hero section with **wavy SVG background** and **decorative circles**  
- App name, catchy tagline, and CTA buttons ("Login" & "Get Started")  
- Fully responsive layout (max width: 1440px, centered)  
- Footer visible across all pages  

### Authentication
- Login and Signup forms with **validation**  
- Inline error messages + **toast notifications** for feedback  
- Simulated authentication using `localStorage`  
- Protected routes for Dashboard and Ticket Management pages  
- Session key: `ticketapp_session`  

### Dashboard
- Displays:
  - Total Tickets  
  - Open Tickets  
  - Resolved Tickets  
- Navigation links to Ticket Management  
- Logout button (clears session and redirects to landing page)  

### Ticket Management (CRUD)
- **Create, View, Edit, Delete** tickets  
- Real-time form validation  
- Inline error messages + toast notifications  
- Confirmation modal for deleting tickets  
- Tickets stored **per user** in `localStorage`  
  - Example key: `tickets_aishah`  
- Validation:
  - `title` (required)
  - `status` (must be `"open"`, `"in_progress"`, or `"closed"`)
  - `description` (optional, but length-limited)
- Color codes:
  - **open** → Green  
  - **in_progress** → Amber  
  - **closed** → Gray  

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Vue 3](https://vuejs.org/) |
| Router | [Vue Router](https://router.vuejs.org/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| State | Composition API + LocalStorage |
| Styling | Custom CSS |
| Icons | [Font Awesome](https://fontawesome.com/) |

---

## 🧠 State Management Summary

- **Authentication:**
  - Stored in `localStorage` under key `ticketapp_session`
  - Example:
    ```json
    {
      "username": "aishah",
      "token": "abc123"
    }
    ```
- **Tickets:**
  - Saved per user under key `tickets`
  - Example:
    ```json
    [
      {
        "id": "tk123",
        "title": "App not loading",
        "status": "open",
        "description": "Issue with dashboard"
      }
    ]
    ```

---

## Installation & Setup

### Clone the Repository
```bash
git clone [fixMate clone](https://github.com/aishah-akinsoji/Ticket-management-vue.git)
cd ticket

npm install

npm run dev

npm run build

npm install vue@next
npm install vue-router@4
npm install axios

npm install @fortawesome/fontawesome-free

