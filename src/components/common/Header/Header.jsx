import { Link } from "react-router-dom";
import { logOut } from "../../../utils/users-service"; // logout util
import styles from "./Header.module.scss";
import EV from "/EV.png";

const Header = ({ setUser }) => {
  const handleLogOut = () => {
    logOut(); // clear token from localStorage
    setUser(null); // update state
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <Link to="/home" className={styles.headerLogo}>
          <img src={EV} alt="EV" />
        </Link>

        {/* Navbar */}
        <nav className={styles.navbar}>
          <ul className={styles.navbarMenu}>
            <li className={styles.navbarItem}>
              <Link to="/home" className={styles.navbarLink}>Home</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link to="/bookings/new" className={styles.navbarLink}>New Booking</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link to="/profile" className={styles.navbarLink}>Profile</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link to="/bookings/history" className={styles.navbarLink}>Booking History</Link>
            </li>
            <li className={styles.navbarItem}>
              <button onClick={handleLogOut} className={styles.navbarLink}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
