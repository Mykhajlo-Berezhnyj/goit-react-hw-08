import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './contactsOps';
import { selectNameFilter, selectModeFilter } from './filtersSlice';
import { normalize } from '../components/utils/normalize';


const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    editingContactId: null,
    isLoading: false,
    error: null,
  },
   reducers: {
    startEditing(state, action) {
      state.editingContactId = action.payload;
    },
    stopEditing(state) {
      state.editingContactId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { id, name, number } = action.payload;
        const contact = state.items.find(item => item.id === id);
        if (contact) {
          contact.name = name;
          contact.number = number;
        }
      })
      .addCase(updateContact.rejected, handleRejected);
  },
});

export default contactSlice.reducer;

export const {startEditing, stopEditing} = contactSlice.actions;

// Selectors

export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectEditingContactId = state => state.contacts.editingContactId;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectModeFilter],
  (contacts, name, mode) => {
    const query = name.toLowerCase();
    const normalizedQuery = normalize(name);
    const isNumeric = Number.isFinite(Number(normalizedQuery));

    return contacts.filter(contact => {
      const normalizedNumber = normalize(contact.number);
      switch (mode) {
        case 'name':
          return contact.name.toLowerCase().includes(query);
        case 'number':
          return normalizedNumber.includes(normalizedQuery);
        case 'all':
        default:
          return (
            contact.name.toLowerCase().includes(query) ||
            (isNumeric && normalizedNumber.includes(normalizedQuery))
          );
      }
    });
  },
);


