import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    listing:[],
    error:null,
    status:"idle",
}


export const createListing = createAsyncThunk("listing/createListing", async(formData, thunkApi)=>{
    try {
        const config = {
            header:{
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post("/api/v1/listing/create", {...formData}, config);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);       
    }
});

// get user listing
export const getUserListing = createAsyncThunk("listing/getUserListing",async(id, thunkApi)=>{
    try {
        const {data} = await axios.get(`/api/v1/listing/${id}`);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.message); 
    }
} );

// delete user listing
export const deleteUserListing = createAsyncThunk("listing/deleteUserListing",async(id, thunkApi)=>{
    try {
        const {data} = await axios.delete(`/api/v1/listing/${id}`);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.message);
    }
})



export const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        clearErrors: (state)=>{
            state.error = null;
        },
        clearStatus: (state)=>{
            state.status = "idle";
        },
        setCustomisedError: (state, action)=>{
            state.error = action.payload;
            state.status = "error";
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(createListing.pending, (state)=>{
                state.status = "pending";
            })
            .addCase(createListing.fulfilled, (state, action)=>{
                state.listing.push(action.payload.listing);
                state.status = "success";
            })
            .addCase(createListing.rejected, (state, action)=>{
                state.status = "error";
                state.error = action.payload.message;
            })
            .addCase(getUserListing.pending, (state)=>{
                state.status = "pending";
            })
            .addCase(getUserListing.fulfilled, (state, action)=>{
                state.status = "success";
                state.listing = action.payload.listing;
            })
            .addCase(getUserListing.rejected, (state, action)=>{
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(deleteUserListing.pending, (state)=>{
                state.status = "pending";
            })
            .addCase(deleteUserListing.fulfilled, (state, action )=>{
                state.status = "success";
                state.listing = state.listing.filter((list)=> list._id !== action.payload.listing._id);
            })
            .addCase(deleteUserListing.rejected, (state, action)=>{
                state.status = "error";
                state.error = action.payload;
            });
    }
});

export const {clearErrors, clearStatus, setCustomisedError} = listingSlice.actions;
export default listingSlice.reducer;
