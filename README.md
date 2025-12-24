# INKFLOW - Premium Tattoo Booking App

Inkflow is a modern, high-end tattoo studio booking application designed to streamline the reservation process for clients and manage schedules for artists. It features a dark, premium aesthetic with signature yellow accents, tailored for a sophisticated user experience.

## 📱 Features Overview

### 🎨 Design & UI/UX
- **Premium Aesthetic**: "Dark Navy + Accent Yellow" theme using Tailwind CSS (Glassmorphism, Glow effects).
- **Responsive Layout**: Validated for both Desktop (Split-screen entry) and Mobile views.
- **Dynamic Interactions**: Smooth transitions, drawer navigation, and micro-animations.

### 🔐 Authentication & User Management
- **Unified Entry Portal**: 
  - Split-screen design with high-quality imagery.
  - Seamless toggle between **Register** and **Login**.
- **Registration**: 
  - Auto-generation of unique **Member ID** (Format: `YYMMDD-XXX`).
  - Instant account creation with success feedback (Emerald Green indicator).
- **Role-Based Login**:
  - **Member**: Access to booking features.
  - **Admin**: Access to management dashboard.
  - *Demo Credentials*: `admin` / `admin` for Admin access.
- **Profile Management**:
  - **Side Drawer**: Quick access to profile details.
  - **Edit Profile**: Update Name, WhatsApp, Email, & Avatar.
  - **Secure Logout**: Clears session and redirects to entry.

### 📅 Booking System (Member)
1.  **Dashboard**:
    *   "Upcoming Session" quick view with status indicators.
    *   One-tap "+ NEW BOOKING" shortcut.
2.  **Smart Booking Flow**:
    *   **Date Selection**: Interactive calendar with day verification (Sundays disabled).
    *   **Artist Selection**: Visual grid with Artist Avatars & Style tags. High-contrast active states.
    *   **Tattoo Details**: Body part selector, Size estimator (with pricing), and Image Upload UI.
    *   **Confirmation**: Review summary before finalizing.
3.  **Success & Management**:
    *   **QR Code**: Auto-generated QR for check-in.
    *   **Booking Detail View**: Full reservation info, Status tracking, Cancel/Rebook actions.

### 🛠️ Admin Dashboard
- **Overview**: Real-time stats (Today's bookings, Pending count).
- **Booking Management**: 
  - List view of all appointments.
  - "Mark as Completed" functionality.
  - Visual status indicators.

---

## 🏗️ Technical Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Icons**: Lucide Vue Next
- **QR Generation**: QRServer API
- **Avatars**: UI Avatars & Unsplash

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── assets/          # Global styles (main.css) and images
├── components/      # Reusable UI components
├── composables/     # Shared logic (if any)
├── router/          # Route definitions (index.js)
├── stores/          # Pinia stores (auth.js, booking.js)
├── views/           # Page components
│   ├── EntryView.vue          # Login/Register Portal
│   ├── RegisterView.vue       # Auth Forms
│   ├── HomeView.vue           # Member Dashboard
│   ├── EditProfileView.vue    # Profile Settings
│   ├── BookingView.vue        # Booking Wizard
│   ├── BookingDetailView.vue  # Reservation Details
│   └── AdminDashboardView.vue # Management Panel
└── App.vue          # Main layout wrapper
```

---

_Designed by LineaWorks_
