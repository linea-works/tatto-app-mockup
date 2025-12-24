import { ref, reactive, computed } from "vue";

const currentScreen = ref("ENTRY"); // State machine: ENTRY, REGISTER, HOME, BOOKING, CONFIRM, SUCCESS, ADMIN_LOGIN
const user = reactive({ name: "", id: "251224-381", history: [] });

const bookingDraft = reactive({
  date: null,
  artist: null,
  size: null,
  images: [],
});

export function useBooking() {
  const navigate = (screen) => {
    // Add simple transition logic here if needed
    currentScreen.value = screen;
    window.scrollTo(0, 0);
  };

  const artists = [
    { id: 1, name: "Kaelthas", style: "Cyber Sigilism", img: "bg-white/10" },
    { id: 2, name: "Viper", style: "Neo-Traditional", img: "bg-white/10" },
    { id: 3, name: "Zero", style: "Blackwork", img: "bg-white/10" },
  ];

  const selectDate = (date) => (bookingDraft.date = date);
  const selectArtist = (artist) => (bookingDraft.artist = artist);
  const selectSize = (size) => (bookingDraft.size = size);

  const confirmBooking = () => {
    // Logic to save to API
    user.history.push({
      ...bookingDraft,
      id: Math.floor(Math.random() * 10000),
      status: "Upcoming",
    });
    navigate("SUCCESS");
  };

  return {
    currentScreen,
    user,
    bookingDraft,
    artists,
    navigate,
    selectDate,
    selectArtist,
    selectSize,
    confirmBooking,
  };
}
