import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = (props) => {
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  return (
    <div className="main">
      <br />
      <h3>Contact Detail</h3>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="">
        <Link to={"/"}>
          <button
            className="ui button blue center"
            style={{ marginLeft: "480px" }}
          >
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
