import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import { v4 as uuidv4 } from "uuid";
import api from "../api/contacts";
export default function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const retrieveAllContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  function AddContactWrapper(props) {
    const navigate = useNavigate();
    return <AddContact {...props} navigate={navigate} />;
  }

  function UpdateContactWrapper(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return <EditContact {...props} navigate={navigate} location={location} />;
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
                contacts={searchTerm.length < 3 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
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
          <Route
            path="/edit"
            element={
              <UpdateContactWrapper
                updateContactHandler={updateContactHandler}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
