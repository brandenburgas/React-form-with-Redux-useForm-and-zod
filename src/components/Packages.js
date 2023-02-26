import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import globalStyles from "./Styles.module.css";
import localStyles from "./Packages.module.css";
import { orderActions } from "../store";
import { formatAmount } from "../helpers/formatAmount";

const schema = z.object({
  packageSelection: z.string(),
});

const Packages = ({ nextPage }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packages);
  const order = useSelector((state) => state.order);
  const locale = useSelector((state) => state.locale);

  const dataUpdateHandle = (formValues) => {
    const selectedPackageObj = packages.find(
      (item) => formValues.packageSelection === item.id
    );
    dispatch(
      orderActions.updatePackage({
        packageId: formValues.packageSelection,
        amount: selectedPackageObj.price.amount,
      })
    );
    nextPage();
  };

  return (
    <div>
      <h2 className={globalStyles.header}>Select a package</h2>
      <form onSubmit={handleSubmit(dataUpdateHandle)}>
        {packages.map((item, index) => {
          return (
            <div key={item.id} className={globalStyles.content}>
              <div>
                <label htmlFor={item.id}>
                  <input
                    type="radio"
                    id={item.id}
                    name="packageSelection"
                    value={item.id}
                    {...register("packageSelection")}
                  />
                  {item.title} (
                  <span>
                    {item.reportCount}{" "}
                    {item.reportCount === 1 ? "report" : "reports"}
                  </span>
                  )
                </label>
              </div>
              <div>
                {index !== 0 && (
                  <span className={localStyles.priceOld}>
                    {formatAmount(
                      packages[0].price.amount * (index + 1),
                      order.price.currency,
                      locale
                    )}
                  </span>
                )}
                <span>
                  {formatAmount(
                    item.price.amount,
                    order.price.currency,
                    locale
                  )}
                </span>
              </div>
            </div>
          );
        })}
        {errors.packageSelection && (
          <p className={globalStyles.error}>Please select a package</p>
        )}
        <button className={globalStyles.button}>Next</button>
      </form>
    </div>
  );
};

export default Packages;
