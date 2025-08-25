import HomePage from "./pages/Home/Home.jsx";
import ProfilePage from "./pages/Profile/Profile.jsx";
// import BookingHistory from "./pages/BookingHistory/BookingHistory.jsx";
import CreateBooking from "./pages/CreateBooking/CreateBooking.jsx";
const routes = [
  { key: "home", path: "/home", Component: HomePage },
  { key: "profile", path: "/profile", Component: ProfilePage },
  // { key: "bookingHistory", path: "/bookings/history", Component: BookingHistory },
  { key: "createBooking", path: "/bookings/new", Component: CreateBooking },
];

export default routes;
