import { combineReducers, createStore } from "redux"
import { accountReduser } from "./accountReduser";
import { authReduser } from "./authReduser";
import { portsReduser } from "./portsReduser";

const saveState = (state) => {
    try {
        // Convert the state to a JSON string
        const serialisedState = JSON.stringify(state);

        // Save the serialised state to localStorage against the key 'app_state'
        window.localStorage.setItem('app_state', serialisedState);
    } catch (error) {
        console.log('Oops, some error');
    }
}

const loadState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.localStorage.getItem('app_state');

        // Passing undefined to createStore will result in our app getting the default state
        // If no data is saved, return undefined

        if (!serialisedState) return undefined;

        // De-serialise the saved state, and return it.
        return JSON.parse(serialisedState);
    } catch (error) {
        // Return undefined if localStorage is not available,
        // or data could not be de-serialised,
        // or there was some other error
        return undefined;
    };
};

let redusers = combineReducers({
    authPage: authReduser,
    portsPage: portsReduser,
    accountPage: accountReduser
});

const oldState = loadState();

export let store = createStore(redusers, oldState);
// export let store = createStore(redusers);

// Add a change listener to the store, and invoke our saveState function defined above.

store.subscribe(() => {
    saveState(store.getState());
});