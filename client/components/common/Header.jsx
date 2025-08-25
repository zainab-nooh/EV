import { Link } from "react-router-dom";
import "../styles/Header.scss";
import EVLogo from "../../styles/EV-Black-Version.png"; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={EVLogo} alt="EV Logo" />
        </Link>

        {/* Profile */}
        <nav className="header-nav">
          <Link to="/profile" className="profile-link">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
 


