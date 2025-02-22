import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInitialItemState, IItem } from '../../types';
import { allItemsData } from '../../mockData';

const initialState: IInitialItemState = {
    allItems: allItemsData,
    Vegetable: [],
    Fruit: [],
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItemFromAllItems: (state, action: PayloadAction<IItem>) => {
            state.allItems = state.allItems.filter((item) => item.name !== action.payload.name);

            state[action.payload.type].push(action.payload);

            return state;
        },
        removeItems: (state, action: PayloadAction<IItem>) => {
            state[action.payload.type] = state[action.payload.type].filter((item) => item.name !== action.payload.name);

            state.allItems.push(action.payload);

            return state;
        }
    },
});

export const { addItemFromAllItems, removeItems } = itemsSlice.actions;

export default itemsSlice.reducer;
