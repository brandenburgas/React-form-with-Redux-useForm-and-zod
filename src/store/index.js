import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageId: "",
  buyer: {
    firstName: "",
    lastName: "",
    email: "",
  },
  vat: {
    countryCode: "",
    rate: "",
  },
  price: {
    currency: "",
    amount: 0,
    grossAmount: 0,
    vatAmount: 0,
  },
};

const orderSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    initializeData(state, action) {
      const { countryCode, rate, currency } = action.payload;
      state.vat = { countryCode: countryCode, rate: rate };
      state.price.currency = currency;
    },
    updatePackage(state, action) {
      const { packageId, amount } = action.payload;
      state.packageId = packageId;
      state.price = {
        ...state.price,
        amount: amount,
        grossAmount: +(amount * (state.vat.rate / 100 + 1)).toFixed(2),
        vatAmount: +((amount * state.vat.rate) / 100).toFixed(2),
      };
    },
    updateUserInfo(state, action) {
      const { firstName, lastName, email } = action.payload;
      state.buyer = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
    },
  },
});

export { orderSlice };
export const orderActions = orderSlice.actions;

const packageSlice = createSlice({
  name: "packages",
  initialState: [],
  reducers: {
    loadPackages(state, action) {
      const packages = action.payload;
      for (let item of packages) {
        state.push(item);
      }
    },
  },
});

export { packageSlice };
export const packagesActions = packageSlice.actions;

const localeSlice = createSlice({
  name: "locale",
  initialState: "",
  reducers: {
    getLocaleInfo(state, action) {
      return action.payload;
    },
  },
});

export { localeSlice };
export const localeActions = localeSlice.actions;

const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
    packages: packageSlice.reducer,
    locale: localeSlice.reducer,
  },
});

export default store;
