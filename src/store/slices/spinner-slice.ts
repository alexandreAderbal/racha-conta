import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MSG_DEFAULT = "Estamos preparando tudo.";

type SpinnerType = {
  ativo: boolean;
  msg?: string;
};
type SpinnerState = {
  spinner: SpinnerType;
};

const estadoInicial: SpinnerState = {
  spinner: {
    ativo: false,
    msg: MSG_DEFAULT,
  },
};

const SpinnerSlice = createSlice({
  name: "SpinnerSlice",
  initialState: estadoInicial,

  reducers: {
    atualizarSpinner(state, action: PayloadAction<SpinnerType>) {
      const { ativo, msg } = action.payload;
      state.spinner = { ativo, msg: msg ? msg : MSG_DEFAULT };
    },
  },
});

export const { atualizarSpinner } = SpinnerSlice.actions;

export default SpinnerSlice.reducer;
