import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>EV Events™</h2>
        <p>
          Your one-stop app for all things events 🎉 — from cakes 🎂 and catering 🍽️
          to DJs 🎧, venues 🏛️, gifts 🎁, and more. Plan your perfect celebration in one place!
        </p>
      </div>

      <div className="footer-section">
        <ul>
          <li><a href="#">🎂 Order a Cake</a></li>
          <li><a href="#">🎧 Book a DJ</a></li>
          <li><a href="#">🏛️ Reserve a Venue</a></li>
          <li><a href="#">🎁 Gifts & Surprises</a></li>
          <li><a href="#">🍽️ Catering & Food</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h2>About EV</h2>
        <p>
          EV makes event planning simple, fun, and stress-free.  
          Whether it’s a birthday, wedding, or party, we’ve got everything you need in one place.  
          Because every event deserves to be unforgettable 
        </p>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} EV Events. All rights reserved.  
        <br />
        Built with ❤️ for everyone who loves to celebrate.
      </div>
    </footer>
  );
};

export default Footer;

