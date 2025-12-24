🏗️ New Project Structure
The project is now modular and scalable:

src/views/: Contains all page logic (HomeView, BookingView, AdminDashboardView, etc.), separated from the main App.vue.
src/stores/: Uses Pinia for state management.
auth.js: Handles Customer ID generation (YYMMDD-XXX), simple admin auth, and user session.
booking.js: Manages booking drafts, image uploads, and the admin booking list.
src/router/: Centralized Vue Router configuration managing navigation flows.
🚀 Key Features Implemented
Customer Flow:
Entry & Registration: Complete flow from Landing -> Register -> Success with Auto-ID Generation.
Home Dashboard: "1-Page" design showing Upcoming Sessions and History.
Booking Process: Multistep flow (Date -> Artist -> Details/Reference Upload -> Confirm).
QR Code: Dynamic QR generation for Booking IDs.
Admin Backoffice:
Login: Secure-ish login (mocked with admin/admin).
Dashboard: View requests vs completed counts.
Action: Added "Mark as Completed" functionality to update booking status.
UI/UX:
Maintained the Dark Premium + Yellow Accent theme.
Added File Upload visual component for reference images.
Responsive Glassmorphism layout.
The app is now fully functional with the new architecture. You can run it with npm run dev.

Good
