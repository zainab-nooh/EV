import { Link } from "react-router-dom";
import styles from "../../common/Header/Header.module.scss";
import EVLogo from "../../../styles/EV.png"; 

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={EVLogo} alt="EV Logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
 


