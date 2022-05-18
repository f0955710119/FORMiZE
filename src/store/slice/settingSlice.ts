import { createSlice } from "@reduxjs/toolkit";

import reducers from "../reducer/settingReducer";

export interface SettingState {
  title: string;
  status: string;
  mode: string;
  pageQuantity: number;
  limitedAnswerTime: number | null;
  limitedResponseQuantity: number | null;
  startPageImageFile: string | File | null;
  startPageParagraph: string;
  endPageImageFile: string | File | null;
  endPageParagraph: string;
}

const initialState: SettingState = {
  title: "空白問卷",
  status: "0",
  mode: "1",
  pageQuantity: 1,
  limitedAnswerTime: null,
  limitedResponseQuantity: null,
  startPageImageFile: null,
  startPageParagraph: "",
  endPageImageFile: null,
  endPageParagraph: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers,
});

export const settingReducer = settingSlice.reducer;
export const settingActions = settingSlice.actions;
