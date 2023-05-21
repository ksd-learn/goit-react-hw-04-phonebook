import { useState } from "react";
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ addContact}) => {

    const [name, setName] = useState('');
    const [number, setnumber] = useState('');

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setnumber(value);
                break
            default:
        }
    };

    const handlSubmit = (event) => {
        event.preventDefault();
        addContact({ name, number });
        setName("");
        setnumber("");
    };

    return (
        <form className={css.addForm} onSubmit={handlSubmit}>
            <label className={css.label}>
                <p>Name</p>
                <input
                    name="name" type="text" value={name} onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={css.label}>
                <p>Number</p>
                <input
                    name="number" type="tel" value={number} onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={css.btn} type="submit">Add contact</button>
        </form>
    )
};

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
    namesContact: PropTypes.arrayOf(PropTypes.string.isRequired)
}

                                //ТАК БЫЛО ДО ЗАМЕЧАНИЙ
//export const ContactForm = ({addContact, namesContact}) => { //!!!!! namesContact можно удалить тут и в App
//
//    const [name, setName] = useState('');
//    const [number, setnumber] = useState('');
//
//    const handleChange = ({ target: { name, value } }) => {
//        switch (name) {
//          case 'name':
//            setName(value);
//            break;
//          case 'number':
//                setnumber(value);
//            break
//          default:
//        }
//    };
//
//    const handlSubmit = (event) => {
//        event.preventDefault();
//        let res = namesContact.includes(name);                    //!!!!!!  Перенес в App (в addContac() )
//        if (res) {                                                //!!!!!!
//            alert(`${name} is already in contacts`);          //!!!!!!
//            setName("")                                           //!!!!!!
//        } else {
//            addContact({ name, number });
//            setName("");
//            setnumber("");
//        }
//    };
//
//    return (
//        <form className={css.addForm} onSubmit={handlSubmit}>
//            <label className={css.label}>
//                <p>Name</p>
//                <input
//                    name="name" type="text" value={name} onChange={handleChange}
//                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                    required
//                />
//            </label>
//            <label className={css.label}>
//                <p>Number</p>
//                <input
//                    name="number" type="tel" value={number} onChange={handleChange}
//                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                    required
//                />
//            </label>
//            <button className={css.btn} type="submit">Add contact</button>
//        </form>
//    )
//}
//
//ContactForm.propTypes = {
//    addContact: PropTypes.func.isRequired,
//    namesContact: PropTypes.arrayOf(PropTypes.string.isRequired)