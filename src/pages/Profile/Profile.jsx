  import Header from "../../components/common/Header/Header";
  import Footer from "../../components/common/Footer/Footer";
  import Navbar from "../../components/common/Navbar/Navbar";
  import styles from "./Profile.module.scss"
  import { getProfile } from '../../utils/users-api';


  import { useState, useEffect } from "react";

  export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
  async function fetchUser() {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
      fetchUser();
    }, []);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
      <Header />
      <div className={styles.profileContainer}>
        <img 
          src={user.picture || '/default-profile.png'} 
          alt={`${user.name}'s profile`} 
          className={styles.profilePicture} 
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <Footer />
      </>
    );
  }