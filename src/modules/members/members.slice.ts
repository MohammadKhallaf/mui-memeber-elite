import { createSlice, nanoid } from '@reduxjs/toolkit';
import { IMember } from './members.modal';

// Define a key for your local storage item
const MEMBERS_STORAGE_KEY = 'members';

// Function to load the initial state from localForage
const loadInitialState = () => {
  const serializedState = localStorage.getItem(MEMBERS_STORAGE_KEY);
  return serializedState ? JSON.parse(serializedState) : [];
};

// Set the initial state synchronously if possible
// Otherwise, you can set it to an empty array or loading state
const initialState: IMember[] = loadInitialState();

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMember: (state, action) => {
      const newMember = { id: nanoid(), ...action.payload };
      state.push(newMember);

      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(state));
    },

    removeMember: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((member) => member.id === id);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(state));
      }
    },

    editMember: (state, action) => {
      const id = action.payload.id;
      const index = state.findIndex((member) => member.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(state));
      }
    },
  },
});

export default membersSlice;
export const { addMember, removeMember, editMember } = membersSlice.actions;
