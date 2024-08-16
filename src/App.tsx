import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, Schedule } from "./pages";
import { Layout } from "./components";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule"  element={<Schedule />} />
      </Route>
    </Routes>
  )
}

export {
  App
}