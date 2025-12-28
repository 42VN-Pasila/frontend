import React from "react";
import { authStorage } from "../../components/Auth/googleLogin/AuthStorage";

const DashBoard: React.FC = () => {
  const auth = authStorage.get();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {!auth ? (
        <p className="mt-2">Not logged in</p>
      ) : (
        <div className="mt-2 text-sm break-all">
          <p><b>userId:</b> {auth.userId}</p>
          <p><b>accessToken:</b> {auth.accessToken}</p>
          <p><b>refreshToken:</b> {auth.refreshToken}</p>
          <p><b>accessTokenExpiryDate:</b> {auth.accessTokenExpiryDate}</p>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
