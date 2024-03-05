import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constants";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const res = await axios.request(options);

    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/text",
  async ({ sourceLang, targetLang, text }) => {
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "e82d60d14emshac33eedaf2a1be0p18ddb9jsn6b6da6aff6bd",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };

    const res = await axios.request(options);
    return res.data.data.translatedText;
  }
);
