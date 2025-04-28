import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  return (
    <div className="main">
      <br />
      <h2>
        Contact List
        <Link to="/add">
          <button style={{ float: "right" }} className="ui button blue">
            Add Contact
          </button>
        </Link>
      </h2>
      <hr></hr>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
