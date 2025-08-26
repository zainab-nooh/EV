//src/components/common/navbar/navbar.jsx
import { Link } from "react-router-dom";
import styles from"../../common/Navbar/Navbar.module.scss";
import { logOut } from '../../../utils/users-service'; // Import logout function
import profile from '/Profile.png'
import home from '/Home.png'
const Navbar = ({ setUser }) => {
    function handleLogOut() {
        logOut(); // Clear the token
        setUser(null); // Update the user state
    }
    return (
        <nav className={styles.navbar}>
        <div className="navbar-container">
            <ul className="navbar-menu">
            <li className="navbar-item">
            {/* <img src={home} alt="Home" className="navbar-home-image"/>  */}
                <Link to="/home" className="navbar-link">Home</Link>
             </li>
            <li className="navbar-item">
                <Link to="/bookings/new" className="navbar-link">New Booking</Link>
            </li>
            <li className="navbar-item">
                <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
            <li className="navbar-item">
                <Link to="/bookings/history" className="navbar-link">Booking History</Link>
            </li>
            <li className="navbar-item">
                <button onClick={handleLogOut} className="navbar-link" style={{background: 'none', border: 'none', cursor: 'pointer'}}>
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












