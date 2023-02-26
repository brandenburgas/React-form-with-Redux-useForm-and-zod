import React from "react";

import globalStyles from "./Styles.module.css";
import localStyles from "./Success.module.css";

const Success = () => {
  return (
    <div className={localStyles.content}>
      <h2 className={globalStyles.header}>Purchase complete!</h2>
    </div>
  );
};

export default Success;
