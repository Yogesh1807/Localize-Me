import React from "react";
import Contact from "../pages/home";
import Dashboard from "../pages/dashboard";
export const AppConfig = {
  access: {},
  modules: [],
  content: {
    default: {
      htmlContent: (data) => {
        return <Dashboard data={data} />;
      },
    },
    contact: {
      htmlContent: (data) => {
        return <Contact data={data} />;
      },
    },
    dashboard: {
      htmlContent: (data) => {
        return <Dashboard>Dashboard</Dashboard>;
      },
    },
  },
};
