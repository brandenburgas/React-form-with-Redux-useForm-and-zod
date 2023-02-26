import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../store/index";

import globalStyles from "./Styles.module.css";
import localStyles from "./UserDetails.module.css";

const schema = z.object({
  firstName: string().min(1, { message: "Please enter a valid first name" }),
  lastName: string().min(1, { message: "Please enter a valid last name" }),
  email: string().email({ message: "Please enter a valid email address" }),
});

const UserDetails = ({ nextPage }) => {
  const order = useSelector((state) => state.order);
  console.log(order);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const { errors } = formState;

  const formSubmitHandler = (formValues) => {
    dispatch(
      orderActions.updateUserInfo({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
      })
    );
    nextPage();
  };

  return (
    <div>
      <h2 className={globalStyles.header}>Enter your details</h2>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className={localStyles.content}
      >
        <div>
          <input
            {...register("firstName")}
            placeholder={
              errors.firstName ? errors.firstName.message : "First name"
            }
          />
          <p className={globalStyles.error}>{errors.firstName?.message}</p>
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" />
          <p className={globalStyles.error}>{errors.lastName?.message}</p>
        </div>
        <div>
          <input {...register("email")} placeholder="E-mail" />
          <p className={globalStyles.error}>{errors.email?.message}</p>
        </div>
        <button className={globalStyles.button}>Next</button>
      </form>
    </div>
  );
};

export default UserDetails;
