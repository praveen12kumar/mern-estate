import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    user:{},
    error:null,
    status:"idle",
    token:null,
    isAuthenticated:false,
    message:"",
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

// Update user profile
export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async({formData, id}, thunkAPI)=>{
    console.log("formData", formData, id)
    try {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.put(`/api/v1/user/update/${id}`,{...formData}, config);
        console.log("data",data);
        return data;
    } catch (error) {
        console.log("error",error)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// delete user
export const deleteUserProfile = createAsyncThunk("auth/deleteUser", async({id}, thunkAPI)=>{
    try {
        const {data} = await axios.delete( `/api/v1/user/delete/${id}`)
        console.log("data",data)
        return data;
    } catch (error) {
        console.log("error",error)
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async(thunkAPI)=>{
    try {
        const {data} = await axios.get( `/api/v1/user/logout`);
        return data;
    } catch (error) {
        console.log("error",error)
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


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
            //register
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
            // login
            .addCase(loginUser.pending, (state)=>{
                state.status = "pending";
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.status = "success";
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
                state.isAuthenticated = false;
            })
            // register with gooogle
            .addCase(googleSignIn.pending,(state)=>{
                state.status = "pending";
            })
            .addCase(googleSignIn.fulfilled, (state, action)=>{
                state.status = "success";
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(googleSignIn.rejected,(state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
                state.isAuthenticated = false;
            })
            //update profile
            .addCase(updateUserProfile.pending,(state)=>{
                state.status = "pending";
            })
            .addCase(updateUserProfile.fulfilled,(state, action)=>{
                state.status = "success";
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state,action)=>{
                state.status = "error";
                state.error = action.payload.message;
            })

            // delete user profile
            .addCase(deleteUserProfile.pending,(state)=>{
                state.status = "pending";
            })
            .addCase(deleteUserProfile.fulfilled,(state, action)=>{
                state.status = "success";
                state.user = {};
                state.isAuthenticated = false;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(deleteUserProfile.rejected,(state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
            })
            // logout user
            .addCase(logoutUser.pending,(state)=>{
                state.status = "pending";
            })
            .addCase(logoutUser.fulfilled,(state, action)=>{
                state.status = "success";
                state.user = {};
                state.isAuthenticated = false;
                state.message = action.payload.message;
            })
            .addCase(logoutUser.rejected, (state, action)=>{
                state.error = action.payload.message;
                state.status = "error"
            })
        }
});


export const {clearErrors, clearStatus} = authSlice.actions;

export default authSlice.reducer;



