import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import defaultProfileIcon from "../../assets/defaultProfileIcon.png";

const ProfileIcon = () => {
  const { userPhoto } = useContext(StoreContext);

  return (
    <div className="profile-icon">
      <img
        src={userPhoto || defaultProfileIcon}
        alt="Profile"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
    </div>
  );
};

export default ProfileIcon;
  