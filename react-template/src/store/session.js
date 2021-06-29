const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
    //no payload needed for the logout action creator
});

//THUNKS
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/',{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json(); //returns user
    if (data.errors) {
        console.log("Authenticate thunk errors:", data);
        return;
    }
    dispatch(setUser(data));
    return data;
};

export const login = (email, password) => async (dispatch)  => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        console.log("Login thunk errors: ", data);
        return;
    }
    dispatch(setUser(data));
    return data;
};

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    await response.json(); //the response won't be used, so no need to save it
    dispatch(removeUser());
};


export const signUp = (formData) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.errors) {
        console.log("SignUp thunk errors: ", data);
        return;
    }
    dispatch(setUser(data));
    return data;
};

const initialState = { user: null };

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}
