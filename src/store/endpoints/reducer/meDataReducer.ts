import { MedataType } from "@/types/auth/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface InitialState {
  access_token?: string | null;
  meData: MedataType | null;
}

const initialState: InitialState = { access_token: null, meData: null };

const meDataSlice = createSlice({
  name: "meData",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ access_token: string }>) => {
      const { access_token } = action.payload;
      state.access_token = access_token;
    },
    clearMeData: (state) => {
      state.access_token = null;
      state.meData = null;
    },

    setMeData: (state, action: PayloadAction<{ meData: MedataType }>) => {
      const { meData } = action.payload;
      state.meData = meData;
    },
  },
});

export default meDataSlice.reducer;
export const { setTokens, clearMeData, setMeData } = meDataSlice.actions;
