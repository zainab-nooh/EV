
import { Link } from "react-router-dom";
import styles from "../../common/Header/Header.module.scss";
import Navbar from "../Navbar/Navbar"; // Import Navbar component
import EV from '/EV.png'

const Header = ({ setUser, ...props }) => { // Accept setUser prop to pass to Navbar
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        {/* Logo */}
        <Link to="/home" className={styles['header-logo']}>
         <img src={EV} alt="EV" />
        </Link>
        
        {/* Navbar */}
        <Navbar setUser={setUser} {...props} />
      </div>
    </header>
  );
};

export default Header;

