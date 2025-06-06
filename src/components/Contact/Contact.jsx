import { FaUser, FaPhone, FaEdit } from 'react-icons/fa';
import css from './Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { startEditing, stopEditing } from '../../redux/contactsSlice';
import { deleteContact, updateContact } from '../../redux/contactsOps';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState, useRef } from 'react';
import { validationContact } from '../utils/validationContact';
import { FaCheck } from 'react-icons/fa';
import { findDuplicateByNumber } from '../findDuplicateByNumber';
import { selectEditingContactId } from '../../redux/contactsSlice';
import { FaTimes } from 'react-icons/fa';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const editingContactId = useSelector(selectEditingContactId);
  const [editName, setEditName] = useState(contact.name);
  const [editNumber, setEditNumber] = useState(contact.number);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState({ name: '', number: '' });
  const allContacts = useSelector(state => state.contacts.items);
  const nameRef = useRef();
  const numberRef = useRef();

  const handleNameChange = evt => {
    const newValue = evt.target.value;
    if (newValue === editName) return;
    setEditName(newValue);
    const errors = validationContact({ name: newValue, number: editNumber });
    setError(errors);
  };

  const handleNumberChange = evt => {
    const newValue = evt.target.value;
    if (newValue === editNumber) return;
    setEditNumber(newValue);
    const errors = validationContact({
      name: editName,
      number: newValue,
    });
    setError(errors);
  };

  const canSwitchField = () => {
    const errors = validationContact({
      name: editName,
      number: editNumber,
    });
    setError(errors);

    if (focusedField === 'name' && errors.name) {
      nameRef.current?.focus();
      return false;
    }

    if (focusedField === 'number' && errors.number) {
      numberRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'You confirm delete this contact?',
      buttons: [
        {
          label: 'Yes',
          className: css['alert-red'],
          onClick: () => dispatch(deleteContact(contact.id)),
        },
        {
          label: 'No',
          className: css['alert-green'],
        },
      ],
    });
  };

  const handleEditing = (evt, field) => {
    if (editingContactId === contact.id) {
      if (focusedField && !canSwitchField()) {
        return;
      }
    } else {
      setError({ name: '', number: '' });
      setEditName(contact.name);
      setEditNumber(contact.number);
    }

    dispatch(startEditing(contact.id));
    setFocusedField(field);
  };

  useEffect(() => {
    if (editingContactId !== contact.id) {
      setFocusedField(null);
      setError({ name: '', number: '' });
    } else if (focusedField) {
      (focusedField === 'name' ? nameRef : numberRef)?.current?.focus();
    }
  }, [editingContactId, contact.id, focusedField]);

  const handleSave = () => {
    const validationErrors = validationContact({
      name: editName,
      number: editNumber,
    });

    if (
      validationErrors &&
      (validationErrors.name || validationErrors.number)
    ) {
      setError(validationErrors);
      return;
    }

    const duplicate = findDuplicateByNumber(
      allContacts,
      editNumber,
      contact.id,
    );
    if (duplicate) {
      confirmAlert({
        title: 'Confirm Update contact',
        message: `Contact with this number: "${duplicate.number}" already exists under name: "${duplicate.name}". Do you want to update the contact?`,
        buttons: [
          {
            label: 'Keep current, delete old',
            onClick: () => {
              dispatch(deleteContact(duplicate.id));
              dispatch(
                updateContact({
                  contactId: contact.id,
                  name: editName.trim(),
                  number: editNumber.trim(),
                }),
              );
              dispatch(stopEditing());
            },
          },
          {
            label: 'Keep old, delete current',
            onClick: () => {
              dispatch(deleteContact(contact.id));
              dispatch(stopEditing());
            },
          },
          {
            label: 'Cancel, return editing',
          },
        ],
      });
      return;
    }

    dispatch(
      updateContact({
        contactId: contact.id,
        name: editName.trim(),
        number: editNumber.trim(),
      }),
    );
    dispatch(stopEditing());
  };

  const handleCancel = () => {
    setEditName(contact.name);
    setEditNumber(contact.number);
    setError({ name: '', number: '' });
    setFocusedField(null);
    dispatch(stopEditing());
  };

  const handleKey = evt => {
    if (evt.key === 'Enter') {
      handleSave();
    }
    if (evt.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={css.container}>
      <div className={css['container-wrap']}>
        <div className={css['contact-item']}>
          <FaUser className={css.icon} />
          {editingContactId === contact.id && focusedField === 'name' ? (
            <div className={css.editContact}>
              <div className={css.inputWrapper}>
                <input
                  ref={nameRef}
                  type="text"
                  aria-label="Edit contact name"
                  value={editName}
                  onChange={handleNameChange}
                  onKeyDown={handleKey}
                  className={error.name ? css.inputError : css.input}
                />
                <FaTimes
                  className={css.iconClear}
                  onClick={() => {
                    setEditName('');
                    nameRef.current?.focus();
                  }}
                />
              </div>
              {error.name ? (
                <p className={css.error}>{error.name}</p>
              ) : (
                <FaCheck className={css.validIcon} />
              )}{' '}
            </div>
          ) : (
            <p
              className={css['contact-data']}
              onDoubleClick={evt => handleEditing(evt, 'name')}
            >
              <span className={css['scrolling-text']}>
                {editingContactId === contact.id ? editName : contact.name}
              </span>
            </p>
          )}
          {!(editingContactId === contact.id && focusedField === 'name') && (
            <FaEdit
              className={css.editIcon}
              onClick={evt => handleEditing(evt, 'name')}
              title="Edit name"
            />
          )}
        </div>
        <div className={css['contact-item']}>
          <FaPhone className={css.icon} />
          {editingContactId === contact.id && focusedField === 'number' ? (
            <div className={css.editContact}>
              <div className={css.inputWrapper}>
                <input
                  ref={numberRef}
                  type="text"
                  name="contact-number"
                  aria-label="Edit contact number"
                  value={editNumber}
                  onChange={handleNumberChange}
                  onKeyDown={handleKey}
                  className={error.number ? css.inputError : css.input}
                />
                <FaTimes
                  className={css.iconClear}
                  onClick={() => {
                    setEditNumber('');
                    numberRef.current?.focus();
                  }}
                />
              </div>
              {error.number ? (
                <p className={css.error}>{error.number}</p>
              ) : (
                <FaCheck className={css.validIcon} />
              )}
            </div>
          ) : (
            <p
              className={css['contact-data']}
              onDoubleClick={evt => handleEditing(evt, 'number')}
            >
              {editingContactId === contact.id ? editNumber : contact.number}
            </p>
          )}
          {!(editingContactId === contact.id && focusedField === 'number') && (
            <FaEdit
              className={css.editIcon}
              onClick={evt => handleEditing(evt, 'number')}
              title="Edit number"
            />
          )}
        </div>
      </div>
      {editingContactId === contact.id ? (
        <div className={css.btnEdit}>
          <button
            type="button"
            aria-label="save contact"
            className={css.btnSaveEdit}
            onClick={handleSave}
            disabled={!!error.name || !!error.number}
          >
            Save
          </button>
          <button
            type="button"
            className={css['btn-cancel']}
            aria-label="cancel edit contact"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={css['btn-delete']}
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}
