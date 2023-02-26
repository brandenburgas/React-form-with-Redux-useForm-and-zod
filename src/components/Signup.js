import React, { useState } from "react";

import Confirmation from "./Confirmation";
import Packages from "./Packages";
import UserDetails from "./UserDetails";
import Success from "./Success";
import FormWrapper from "./FormWrapper";

const Signup = () => {
  const [page, setPage] = useState(0);

  const renderNextPage = () => {
    setPage(page + 1);
  };

  const componentsList = [
    <Packages nextPage={renderNextPage} />,
    <UserDetails nextPage={renderNextPage} />,
    <Confirmation nextPage={renderNextPage} />,
    <Success />,
  ];

  return <FormWrapper>{componentsList[page]}</FormWrapper>;
};

export default Signup;
