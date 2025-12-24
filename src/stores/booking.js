import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useBookingStore = defineStore("booking", () => {
  const artists = ref([
    {
      id: 1,
      name: "Kaelthas",
      style: "Cyber Sigilism",
      img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Viper",
      style: "Neo-Traditional",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Zero",
      style: "Blackwork",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80",
    },
  ]);

  // Generate December 2025 dates
  const daysInMonth = 31;
  const startDayOffset = 1; // Mon = 0, say Dec 1st is Monday for mock purposes
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateObj = new Date(2025, 11, day);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    return {
      day,
      dayName,
      fullDate: `2025-12-${String(day).padStart(2, "0")}`,
      active: dayName !== "Sun", // Closed on Sundays
    };
  });

  const draft = reactive({
    date: null,
    artist: null,
    size: null,
    images: [], // New feature: images
  });

  // Mock Admin Data
  const adminBookings = ref([
    {
      id: "121224-001",
      customer: "Alex Doe",
      artist: "Viper",
      size: "L - 15cm",
      date: 12,
      status: "Pending",
    },
    {
      id: "111224-002",
      customer: "Sarah V.",
      artist: "Zero",
      size: "S - <5cm",
      date: 11,
      status: "Completed",
    },
  ]);

  const selectDate = (date) => (draft.date = date);
  const selectArtist = (artist) => (draft.artist = artist);
  const selectSize = (size) => (draft.size = size);
  const clearDraft = () => {
    draft.date = null;
    draft.artist = null;
    draft.size = null;
    draft.images = [];
  };

  const confirmBooking = (user) => {
    const booking = {
      ...draft,
      id: Math.floor(Math.random() * 10000) + "-X",
      status: "Upcoming",
      invoice: `INV-${Date.now()}`,
    };

    // Add to user history
    user.history.unshift(booking);

    // Add to admin list (mock)
    adminBookings.value.unshift({
      id: booking.id,
      customer: user.name,
      artist: draft.artist.name,
      size: draft.size,
      date: draft.date,
      status: "Pending",
    });

    return booking;
  };

  const markCompleted = (id) => {
    const booking = adminBookings.value.find((b) => b.id === id);
    if (booking) booking.status = "Completed";
  };

  return {
    artists,
    dates,
    draft,
    adminBookings,
    selectDate,
    selectArtist,
    selectSize,
    clearDraft,
    confirmBooking,
    markCompleted,
  };
});
