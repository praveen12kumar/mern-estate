import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    user:{},
    error:null,
    status:"idle",
    token:null,
    isAuthenticated:false
}
// register user
export const registerUser = createAsyncThunk("auth/registerUser", async({username, email, password},thunkAPI)=>{
    try {
        const config = {
            headers:{
                "Content-Type": "application/json",
            }
        }

        const {data} = await axios.post("/api/v1/auth/register", {username, email, password}, config);
        //console.log("data", data);
        return data;

    } catch (error) {
        //console.log("error", error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// login user
export const loginUser = createAsyncThunk("auth/loginUser", async({email, password}, thunkAPI)=>{
    try {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("/api/v1/auth/login", {email, password}, config);
        //console.log("data", data);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }   
});


// signin with google
export const googleSignIn = createAsyncThunk("auth/signinWithGoogle", async({username, email, avatar}, thunkAPI)=>{
    try {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/v1/auth/google", {username, email, avatar}, config);
        console.log("data",data)
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);     
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        clearErrors: (state)=>{
            state.error = null;
        },
        clearStatus: (state)=>{
            state.status = "idle";
        }
    },

    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending, (state)=>{
                state.status = "pending";
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.status = "success";
                state.user = action.payload.user;
                
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
            })
            .addCase(loginUser.pending, (state)=>{
                state.status = "pending";
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.status = "success";
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
                state.isAuthenticated = false;
            })
            .addCase(googleSignIn.pending,(state)=>{
                state.status = "pending";
            })
            .addCase(googleSignIn.fulfilled, (state, action)=>{
                state.status = "success";
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(googleSignIn.rejected,(state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
                state.isAuthenticated = false;
            })
    }

});


export const {clearErrors, clearStatus} = authSlice.actions;

export default authSlice.reducer;



