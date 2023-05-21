import { useEffect, useState } from "react";
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { nanoid } from "nanoid";
import css from './App.module.css';
import { exampleBook } from '../data/exampleBook';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const book = localStorage.getItem('phonebook');
    if (book) {
      const parsePhonebook = JSON.parse(book);
      return parsePhonebook
    } else {
      return exampleBook
    }
  });  

  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts))
  }, [contacts]);  

  const addContact = (userData) => {
    let isExist = contacts.find((item) => item.name === userData.name)
    if (isExist) {
        alert(`${userData.name} is already in contacts`);
    } else {
      const newUser = { ...userData, id: nanoid() };
      setContacts(prevstate => [...prevstate, newUser])
    }
  };

  const deleteContacts = (id) => {
    setContacts(prevstate => { 
      const newState = prevstate.filter((user) => user.id !== id)
      return newState
    })
  };
                                              //запись в state--filter значения input (event.target.value)
  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value)
  };

  const filterContact = (name, filter) => {
    let nameLow = name.toLocaleLowerCase();
    let filterLow = filter.toLocaleLowerCase();
    return (nameLow.indexOf(filterLow) >= 0)
  };

  const contactSeach = contacts.filter((user) => filterContact(user.name, filter));

  return (
    <div className={css.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      
      <h2>Contacts</h2>
      <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
      <ContactList contactSeach={contactSeach} deleteContacts={deleteContacts} />
    </div>
  );

}
