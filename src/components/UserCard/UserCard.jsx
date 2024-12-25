import React, { useEffect, useState } from "react";
import styles from "./UserCard.module.css";

const UserCard = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const resp = await fetch("https://randomuser.me/api/?page=1&results=1&seed=abc");
    const data = await resp.json();
    const user = data.results[0];

    setUserInfo({
      image: user.picture.large,
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      phone: user.phone,
    });
  };

  const formatName = (name) => {
    if (!name || typeof name !== "string") return "Unknown";
    let firstChar = name.charAt(0).toUpperCase();
    let restOfName = name.slice(1).toLowerCase();
    return firstChar + restOfName;
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userCardContainer}>
        {userInfo ? (
          <div className={styles.userCard}>
            <div className={styles.userCardImageContainer}>
              <img
                className={styles.userCardImage}
                src={userInfo.image}
                alt={`${userInfo.firstName} ${userInfo.lastName}`}
              />
            </div>
            <div className={styles.userCardDetails}>
              <h2 className={styles.userCardName}>
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <p className={styles.userCardInfo}>Gender: {formatName(userInfo.gender)}</p>
              <p className={styles.userCardInfo}>Phone: {userInfo.phone}</p>
            </div>
          </div>
        ) : (
          <div className={styles.loadingText}>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
