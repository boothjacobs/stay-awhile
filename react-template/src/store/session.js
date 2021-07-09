import { SET_RANCH } from "./ranch-store";
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

const setRanch = (ranch) => ({
    type: SET_RANCH,
    payload: ranch
}); //for staff account creation with Ranch create

//THUNKS
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth');
    // {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }
    const data = await response.json(); //returns user
    if (data.errors) {
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
        return data.errors;
    }
    dispatch(setUser(data));
    return data;
};

export const demoGuest = () => async (dispatch) => {
    const res = await fetch('api/auth/demo/guest');
    const data = await res.json();
    if (data.errors) {
        return data.errors;
    }
    dispatch(setUser(data));
    return data;
};

export const demoStaff = () => async (dispatch) => {
    const res = await fetch('api/auth/demo/staff');
    const data = await res.json();
    if (data.errors) {
        return data.errors;
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


export const signUp = (full_name, email, password, age, phone_number, dietary_restrictions, emergency_contact, staff,
                        //extra fields for staff account/Ranch create
                        ranch_name, location, description, nightly_rate) => async (dispatch) => {

    const userResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({full_name, email, password, age, phone_number, dietary_restrictions, emergency_contact, staff}),
    });
    const userData = await userResponse.json();

    if (userData.errors) {
        console.log("SignUp thunk errors from user: ", userData);
        return userData.errors;
    };

    dispatch(setUser(userData));

    if (ranch_name !== "") {
        console.log("RANCH CONDITIONAL INSIDE SIGNUP THUNK")
        const ranchResponse = await fetch("/api/ranch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ranch_name, location, description, nightly_rate}),
        });
        const ranchData = await ranchResponse.json();
        console.log("RANCH DATA", ranchData)
        dispatch(setRanch(ranchData));

        if (ranchData.errors) {
            console.log("SignUp thunk errors from ranch: ", ranchData);
            return ranchData.errors;
        }
    };

    return userData;
};

const initialState = { user: null, loaded: false };

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload, loaded: true}
        case REMOVE_USER:
            return {user: null, loaded: true}
        case SET_RANCH:
            return {...state, "ranch": action.payload, loaded: true}
        default:
            return state;
    }
}
