import { orderActions, packagesActions, localeActions } from "./index";

export const getInitialData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const responseGeo = await fetch("http://ipapi.co/json/");
      const responseVAT = await fetch(
        "https://run.mocky.io/v3/df0247f5-9d4c-427c-b68a-b0a9e3702975"
      );
      const responsePackages = await fetch(
        "https://run.mocky.io/v3/d6483a22-16d8-47e3-81d4-8724fb504803"
      );

      if (!responseGeo.ok || !responseVAT.ok || !responsePackages.ok) {
        throw new Error("Error loading the data.");
      }
      const locationData = await responseGeo.json();
      const currency = locationData.currency;
      const vatData = await responseVAT.json();
      const packages = await responsePackages.json();

      let { countryCode, rate } = vatData.find(
        (country) => locationData.country.toLowerCase() === country.countryCode
      );

      if (!countryCode || !rate) {
        countryCode = "";
        rate = 0;
      }

      return { packages, countryCode, rate, currency };
    };

    try {
      const {
        packages,
        countryCode,
        rate,
        currency = "EUR",
      } = await fetchData();

      dispatch(
        orderActions.initializeData({
          countryCode: countryCode,
          rate: rate,
          currency: currency,
        })
      );

      dispatch(packagesActions.loadPackages(packages));

      const userLocale = navigator.language ? navigator.language : "en-EU";
      dispatch(localeActions.getLocaleInfo(userLocale));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendOrderData = (order) => {
  const sendData = async () => {
    const response = await fetch(
      "https://packages-data-default-rtdb.europe-west1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify(order),
      }
    );
    if (!response.ok) {
      throw new Error("Posting data has failed");
    }
  };

  try {
    sendData();
  } catch (error) {
    console.log(error);
  }
};
