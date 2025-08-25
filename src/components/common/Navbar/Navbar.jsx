
import { Link } from "react-router-dom";
import "../../common/Navbar/Navbar.module.scss"; 
import profile from '/Profile.png'
import home from '/Home.png'
 const Navbar = props => {
    return (
        
        <nav className="navbar">
        <div className="navbar-container">
            <ul className="navbar-menu">
            className="navbar-item"
            <img src={home} alt="Home" className="navbar-home-image"/>  
            <li className="navbar-item">
                <Link to="/new-booking" className="navbar-link">New Booking</Link>
            </li>
            <li className="navbar-item">
                <Link to="/logout" className="navbar-link">Logout</Link>
            </li>
            </ul>
            <div className="navbar-profile">
            <img src={profile} alt="Profile" className="navbar-profile-image" />
            </div>
        </div>
        </nav>
    );


 }
    export default Navbar;