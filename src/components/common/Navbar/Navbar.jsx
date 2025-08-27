//src/components/common/navbar/navbar.jsx
import { Link } from "react-router-dom";
import styles from"../../common/Navbar/Navbar.module.scss";
import { logOut } from '../../../utils/users-service'; // Import logout function
// import profile from '/Profile.png'
// import home from '/Home.png'

const Navbar = ({ setUser, ...props }) => { // Accept setUser as prop
    
    const handleLogOut = () => {
        logOut(); // Clear token from localStorage
        setUser(null); // Update user state to null
    };

    return (
        <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
            <ul className={styles.navbarMenu}>
            <li className={styles.navbarItem}>
            {/* <img src={home} alt="Home" className={styles.navbarHomeImage}/>  */}
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
                <button 
                    onClick={handleLogOut} 
                    className={styles.navbarLink}
                >
                    Logout
                </button>
            </li>
            </ul>
            {/* <div className="navbar-profile">
            <img src={profile} alt="Profile" className="navbar-profile-image" />
            </div> */}
        </div>
        </nav>
    );
}

export default Navbar;