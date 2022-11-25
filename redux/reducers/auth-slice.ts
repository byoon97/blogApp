import { User } from './../../types/typings.d';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "nookies";

interface myData {
    identifier: string
    password: string
}

interface RegisterUser {
    username: any
    email: any
    password: any
}

interface UsersState {
    isLoggedIn : boolean
    user : {
        id: any
        email: string
        jwt: string
        username: string
    }
}

const initialState = {
    isLoggedIn : false,
    user: {},
  } as UsersState

const handleLogin = async (identifier : string, password : string) => {
  const loginInfo : myData = {
    identifier,
    password
  };

  const login = await fetch(`https://motive-app.herokuapp.com/api/auth/local`, {
  // const login = await fetch(`http://localhost:1337/api/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  const loginResponse = await login.json();

  // If error, set error, else set cookies
  if (loginResponse.error) {
    window.alert(loginResponse.message[0].messages[0].message)
  } else {
    setCookie(null, "jwt", loginResponse.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      
    });
    // store user's token in local storage
    localStorage.setItem("userToken", loginResponse.jwt);
  }
  return loginResponse.user;
};


//thunks

export const handleLoginThunk = createAsyncThunk<
  User,
  { identifier: any, password: any } & Partial<User>

>('users/update', async (userData : myData) => {
  try {
    const { identifier, password } = userData
    console.log(userData)
    const response = await handleLogin(identifier, password)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
})

// register thunk

export const handleRegisterThunk = createAsyncThunk<
User,
{ username: any, password: any, email: any } & Partial<RegisterUser>

>('users/Register', async (registerInfo) => {
try {
    // const register = await fetch(`https://motive-app.herokuapp.com/api/auth/local/register`, {
  const register = await fetch(`http://localhost:1337/api/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  });

  const registerResponse = await register.json();

  if (registerResponse.error) {
    window.alert(registerResponse.message[0].messages[0].message)
  } else {
    setCookie(null, "jwt", registerResponse.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }

  return registerResponse.user
} catch (err) {
  console.log(err)
  throw err
}
})


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = { email: '', jwt: '', username: '', id: undefined};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLoginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
    });
    builder.addCase(handleRegisterThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice;

