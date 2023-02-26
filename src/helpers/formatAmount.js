export const formatAmount = (amount, currency, locale) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
