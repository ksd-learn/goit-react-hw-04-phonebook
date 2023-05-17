import { useEffect, useState } from "react";
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { nanoid } from "nanoid";
import css from './App.module.css'

export const App = () => {

  const exampleBook =
    [ { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ];

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

  const addContact = (userData) => {
    const newUser = { ...userData, id: nanoid() };
    setContacts(
      prevstate => [...prevstate, newUser]
      )
  };
  //
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

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts))
  }, [contacts]);

    const contactSeach = contacts.filter((user) => filterContact(user.name, filter));
    const namesContact = contacts.map(user => user.name);

    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} namesContact={namesContact} />

        <h2>Contacts</h2>
        <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
        <ContactList contactSeach={contactSeach} deleteContacts={deleteContacts} />
      </div>
    );

}
