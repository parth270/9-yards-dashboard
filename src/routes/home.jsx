import React, { Suspense } from "react";
const HomePage = React.lazy(() => import("../views/home.jsx"));

const HomeRoute = () => {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
};

export default HomeRoute;
