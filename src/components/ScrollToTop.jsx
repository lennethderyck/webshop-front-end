import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";

//Makes sure you scroll to the top when you change the route
function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
