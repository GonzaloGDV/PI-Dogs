import React from "react";
import dogePageNotFound from "../images/page-not-found.jpeg";

const PageNotFound = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <img className={PageNotFound} src={dogePageNotFound} alt="Error 404" />
    </div>
  );
};

export default PageNotFound;
