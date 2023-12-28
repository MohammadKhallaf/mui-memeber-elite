import { createSlice, nanoid } from '@reduxjs/toolkit';
import { IMember } from './members.modal';

// Define a key for your local storage item
const MEMBERS_STORAGE_KEY = 'members';

// Function to load the initial state from localForage
const loadInitialState = async () => {
  const serializedState = localStorage.getItem(MEMBERS_STORAGE_KEY);
  return serializedState ? JSON.parse(serializedState) : [];
};

// Set the initial state synchronously if possible
// Otherwise, you can set it to an empty array or loading state
const initialState: IMember[] = await loadInitialState();

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMember: (state, action) => {
      const id = nanoid();
      state.push({ id, ...action.payload });

      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(state));
    },

    removeMember: (state, action) => {
      const id = action.payload;
      const newList = state.filter((member) => member.id !== id);
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(newList));
      return newList;
    },
  },
});

export default membersSlice;
export const { addMember, removeMember } = membersSlice.actions;
