import { Navigate, redirect } from "react-router-dom";

const isAuthenticated = () => {
    const session = localStorage.getItem("session");

    if (session) throw redirect("/");
    return null;
}

const handleVerificationProtected = () => {
    const session = localStorage.getItem("session");

    if (!session) throw redirect("/signin");
    return null;
}

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const getStoredUsers = () => {
    const users = localStorage.getItem('registered_users');
    return users ? JSON.parse(users) : [];
};

const findUserByEmail = (email) => {
    const users = getStoredUsers();
    return users.find(user => user.email === email);
};

const signIn = async (email, password) => {
    const user = findUserByEmail(email);
    
    if (!user || user.password !== password) {
        return { data: null, error: 'invalid-credentials' };
    }

    localStorage.setItem('session', JSON.stringify({ user: { id: user.id, email: user.email, role: 'authenticated' } }));
    return { data: { user }, error: null };
};

const signUp = async (email, password) => {
    const existingUser = findUserByEmail(email);
    
    if (existingUser) {
        return { data: null, error: 'email-already-exists' };
    }

    const newUser = {
        id: generateId(),
        email,
        password,
        role: 'authenticated'
    };

    const users = getStoredUsers();
    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));

    localStorage.setItem('session', JSON.stringify({ user: { id: newUser.id, email: newUser.email, role: 'authenticated' } }));
    return { data: { user: newUser }, error: null };
};

const signOut = async (navigate) => {
    localStorage.removeItem('session');
    navigate("/signin");
};

export {
    isAuthenticated,
    handleVerificationProtected,
    signIn,
    signUp,
    signOut
}