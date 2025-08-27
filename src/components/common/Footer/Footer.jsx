
import styles from "../../common/Footer/Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Brand & Mission Section */}
      <div className={styles.footerSection}>
        <h2>EV Events</h2>
        <p>
          Orchestrating extraordinary experiences through comprehensive event management solutions. 
          From intimate gatherings to grand celebrations, we transform your vision into unforgettable moments 
          with precision, creativity, and unparalleled attention to detail.
        </p>
        <div className={styles.brandTagline}>
          <em>"Where Every Event Becomes Extraordinary"</em>
        </div>
      </div>

      {/* Services Section */}
      <div className={styles.footerSection}>
        <h2>Our Services</h2>
        <ul className={styles.servicesList}>
          <li><a href="/services/catering">Premium Catering & Culinary Arts</a></li>
          <li><a href="/services/venues">Exclusive Venue Partnerships</a></li>
          <li><a href="/services/entertainment">Professional Entertainment Services</a></li>
          <li><a href="/services/design">Custom Event Design & Styling</a></li>
          <li><a href="/services/coordination">Full-Service Event Coordination</a></li>
          <li><a href="/services/specialty">Specialty Services & Add-ons</a></li>
        </ul>
      </div>

      {/* Company Information */}
      <div className={styles.footerSection}>
        <h2>About EV Events</h2>
        <p>
          Established with a commitment to excellence, EV Events has redefined the landscape of 
          event management through innovative solutions and personalized service. Our dedicated team 
          of professionals brings years of expertise to every celebration, ensuring seamless execution 
          and exceptional results.
        </p>
        
        <div className={styles.contactInfo}>
          <h3>Connect With Us</h3>
          <div className={styles.contactDetails}>
            <p>✉ EV@GA.com</p>
            <p>☎ +973 00000000</p>
            <p>⚲ Bahrain, Manama, BIBF</p>
          </div>
        </div>
      </div>

      {/* Additional Links Section */}
      <div className={styles.footerSection}>
        <h2>Resources</h2>
        <div className={styles.linksGrid}>
          <div className={styles.linkColumn}>
            <h4>Client Portal</h4>
            <ul>
              <li><a href="/account/dashboard">Account Dashboard</a></li>
              <li><a href="/bookings/manage">Manage Bookings</a></li>
              <li><a href="/gallery">Event Gallery</a></li>
              <li><a href="/testimonials">Client Testimonials</a></li>
            </ul>
          </div>
          
          <div className={styles.linkColumn}>
            <h4>Support</h4>
            <ul>
              <li><a href="/help/planning">Event Planning Guide</a></li>
              <li><a href="/help/faq">Frequently Asked Questions</a></li>
              <li><a href="/support">Customer Support</a></li>
              <li><a href="/contact">Schedule Consultation</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.copyrightSection}>
          <p>© {currentYear} EV Events Professional Services. All rights reserved.</p>
          <p className={styles.tagline}>
            Crafted with passion and precision for those who celebrate life's most precious moments.
          </p>
        </div>
        
        <div className={styles.legalLinks}>
          <a href="/privacy">Privacy Policy</a>
          <span className={styles.separator}>•</span>
          <a href="/terms">Terms of Service</a>
          <span className={styles.separator}>•</span>
          <a href="/accessibility">Accessibility</a>
        </div>
 
      </div>
    </footer>
  );
};

export default Footer;
