import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import { v4 as uuidv4 } from "uuid";
import api from "../api/contacts";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const retrieveAllContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  function AddContactWrapper(props) {
    const navigate = useNavigate();
    return <AddContact {...props} navigate={navigate} />;
  }

  useEffect(async () => {
    const allcontacts = await retrieveAllContacts();
    if (allcontacts) setContacts(allcontacts);
    // getAllContacts();
    // const retrieveContacts = retrieveAllContacts();
    // if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  // useEffect(() => {
  //   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ContactList
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddContactWrapper addContactHandler={addContactHandler} />
            }
          />
          <Route path="/contact/:id" Component={ContactDetail} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
