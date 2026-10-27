# Eventra (E-Event) — Event Management & Ticket Booking Platform

**Eventra** is a modern, high-performance Event Management and Ticket Booking web application crafted with React 18, Vite, Bootstrap 5, and custom styling.

Designed around a luxury Deep Purple (`#350047`) and Accent Pink (`#F43F8C`) aesthetic:
- **Public Portal**: Inspired by concert staging, bold typography (*"Discover what's worth showing up for."*), large 16:9 landscape event imagery, dynamic category filtering, interactive ticketing checkout, and cryptographic QR passes.
- **Admin Analytics Console**: Inspired by top-tier SaaS analytics dashboards featuring clean white backgrounds, `#EAECF0` borders, purple and pink Recharts visualizations, event inventory management, turnstile gate ticket verification, and CSV ledger reporting.

---

## 🚀 Key Features

### 1. Public Experience & Attendee Portal
- **Deep-Purple Header**: Sticky glassmorphic navigation bar with logo, active link indicators in pink, mobile drawer, and authenticated user dropdown.
- **Hero Section**:
  - Full-width 16:9 concert hero photo with subtle zoom animation and lighting.
  - Two-column hero block with bold headline: *"Discover what's worth showing up for."*
  - Direct navigation to `/events` and `/about`.
- **Featured Events Section**: *"Events Worth Experiencing"* with category filter pills (Music & Concerts, Technology, Workshops, Business, Art & Culture, Sports).
- **Explore Events (`/events`)**: Multi-criteria search, category filters, location filters, price range filters, date sorting, and responsive grid with pagination.
- **Event Details (`/events/:id`)**: Banner, event schedule, venue address, verified organizer badges, ticket tier selection, dynamic price calculator, and live checkout modal with confetti celebration.
- **Digital Passbook & QR Ticket (`/my-bookings/:id`)**:
  - Realistic perforated boarding pass layout.
  - Scannable QR code powered by `qrcode.react`.
  - Print / Save as PDF capability formatted for print media.
- **Attendee Dashboard (`/dashboard`)**: Upcoming reservations, total tickets, spending metrics, and order history.
- **Authentication (`/login` & `/register`)**: Split-screen design with showcase imagery, password visibility toggle, client validation, and 1-click Demo credentials for frictionless testing.

### 2. Admin Operations & Analytics Console
- **Analytics Dashboard (`/admin/dashboard` & `/admin/analytics`)**:
  - 4 Key metric cards (Total Revenue, Total Attendees, Events Hosted, Total Tickets Sold).
  - Revenue & Attendance Trends (Recharts Area & Line combined chart with purple & pink gradients).
  - Event Capacity vs Tickets Sold (Bar chart).
  - Attendee Growth Velocity (Line chart).
  - Categories by Revenue (Donut/Pie chart).
  - Top Performing Events table with progress bars.
- **Event Catalog Management (`/admin/events`)**:
  - Event listing with thumbnails, dates, venues, capacity progress bars.
  - Publish / Unpublish 1-click toggles.
  - Delete or Cancel events.
- **Create & Edit Event Form (`/admin/events/create`)**:
  - Multi-tier ticketing builder (add/remove custom tiers, price, and quotas).
  - Preset verified event photo picker + custom URL support.
  - Start/end dates, times, venue details, and organizer information.
- **Bookings Management (`/admin/bookings`)**:
  - Audit transactions, search by customer/reference/event, view receipt breakdown modal.
- **Attendee Directory & CRM (`/admin/attendees`)**:
  - Attendee profiles, booking frequency, total spent, and VIP tier badges.
- **Gate Access & Ticket Verification (`/admin/verify-ticket`)**:
  - Optical QR scanner simulation with animated scanning laser.
  - Manual ticket ID input.
  - 4 clearance states: **Valid & Ready for Check-in**, **Already Used** (prevents duplicate venue entry!), **Invalid / Counterfeit**, and **Cancelled**.
  - One-click "Grant Entry & Check In Attendee" action that updates ticket status in real-time.
- **Reports & Ledger (`/admin/reports`)**:
  - Date-range filtering and real CSV file generation and export.

---

## 🛠 Technology Stack

- **React 18** & **Vite 6**
- **React Router DOM v6** (with protected attendee & admin route guards)
- **Bootstrap 5** & Custom CSS
- **Recharts** (clean area, line, bar, and donut charts)
- **Axios** (configured with `VITE_API_URL` and smart development fallback)
- **React Icons** (Feather icons)
- **qrcode.react** (dynamic QR codes for tickets)
- **canvas-confetti** (delightful booking confirmation celebration)

---

## 📦 How to Run the Frontend

1. Ensure dependencies are installed:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Accounts for Quick Evaluation

You can sign in with either account on the `/login` page using the one-click demo buttons:
- **Attendee Demo**: `alex.morgan@eventra.com` (Attendee role)
- **Admin Demo**: `admin@eventra.com` (Administrator role)
