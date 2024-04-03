//Manage state in localStorage

export function loadState() { 
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);        
    } catch (err) {
        return undefined;
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        console.log(err);
    }
}

export function removeItem(id) {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        
        const items = JSON.parse(serializedState);
        items.filter((item) => item.itemId !== id);
        return JSON.stringify(items);
    } catch (err) {
        console.log(err);
    }
}
