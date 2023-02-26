import React from "react";
import { useSelector } from "react-redux";

import globalStyles from "./Styles.module.css";
import localStyles from "./Confirmation.module.css";
import { sendOrderData } from "../store/order-actions";
import { formatAmount } from "../helpers/formatAmount";

const Confirmation = ({ nextPage }) => {
  const order = useSelector((state) => state.order);
  const packages = useSelector((state) => state.packages);
  const locale = useSelector((state) => state.locale);

  const { reportCount } = packages.find((item) => order.packageId === item.id);

  const orderCompleteHandler = () => {
    sendOrderData(order);

    nextPage();
  };

  return (
    <div>
      <h2 className={globalStyles.header}>Review your order</h2>
      <div className={globalStyles.content}>
        <div className={localStyles.column}>
          <p>Package</p>
          <p>Buyer</p>
          <p>Price</p>
          <p>VAT ({order.vat.rate}%)</p>
          <p>Total</p>
        </div>
        <div className={localStyles.column}>
          <p>
            {order.packageId.slice(0, 1).toUpperCase() +
              order.packageId.slice(1)}{" "}
            ({reportCount} {reportCount === 1 ? "report" : "reports"})
          </p>
          <p>
            {order.buyer.firstName} {order.buyer.lastName}
          </p>
          <p>
            {formatAmount(order.price.amount, order.price.currency, locale)}
          </p>
          <p>
            {formatAmount(order.price.vatAmount, order.price.currency, locale)}
          </p>
          <p>
            {formatAmount(
              order.price.grossAmount,
              order.price.currency,
              locale
            )}
          </p>
        </div>
      </div>
      <button onClick={orderCompleteHandler} className={globalStyles.button}>
        Complete purchase
      </button>
    </div>
  );
};

export default Confirmation;
