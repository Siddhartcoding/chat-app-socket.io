import React from "react";
import "./Join.css";
import { Link } from "react-router-dom";
let username;
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const Join = () => {
  const sendUser = () => {
    username = user_list[Math.floor(Math.random() * user_list.length)];
    console.log(username);
  };

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        {/* // <img src={logo} alt="logo" /> */}
        <h1>Let's Chat</h1>

        <Link to="/chat">
          <button onClick={sendUser} className="joinbtn">
            Login In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { username };
