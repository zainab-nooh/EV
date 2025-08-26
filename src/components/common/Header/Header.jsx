import { Link } from "react-router-dom";
import styles from "../../common/Header/Header.module.scss";
import EV from '/EV.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        {/* Logo */}
        <Link to="/home" className="header-logo">
         <img src={EV} alt="EV" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
 


