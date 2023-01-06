import React from "react";

export default function Profile({ userData }) {
  return (
    <div>
      <>
        <div className=" w-50 m-auto py-3 my-3 bg-light rounded-2 text-dark text-center">
          <h3>
            Name : {userData?.first_name}
            {userData?.last_name}
          </h3>
          <h3>Email : {userData?.email}</h3>
          <h3>Age : {userData?.age}</h3>
        </div>
      </>
    </div>
  );
}
