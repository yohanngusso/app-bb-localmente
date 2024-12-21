import { getUser } from '../utils/core';

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const getStorageKey = (table) => {
    const user = getUser();
    return `${table}_${user?.id || 'anonymous'}`;
};

const update = async (table, data, id) => {
    const storageKey = getStorageKey(table);
    let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (id) {
        data.id = id;
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...data };
        }
    } else {
        data.id = generateId();
        data.created_at = new Date().toISOString();
        data.user_id = getUser()?.id;
        items.push(data);
    }

    localStorage.setItem(storageKey, JSON.stringify(items));
    return { data: [data] };
};

const drop = async (table, id) => {
    const storageKey = getStorageKey(table);
    let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    items = items.filter(item => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(items));
    return { data: null };
};

const get = async (table, conditions) => {
    const storageKey = getStorageKey(table);
    let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (conditions && conditions.length > 0) {
        items = items.filter(item => 
            conditions.every(condition => 
                item[condition.field] === condition.value
            )
        );
    }

    items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return items[0] || null;
};

const list = async (table) => {
    const storageKey = getStorageKey(table);
    let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const user = getUser();
    
    items = items.filter(item => item.user_id === user?.id);
    items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    return items;
};

const save = (table, data) => {
    return update(table, data, null);
};

export {
    save,
    update,
    drop,
    get,
    list
};
