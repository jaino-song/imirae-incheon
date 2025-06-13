import React from 'react';
import { createRoot } from 'react-dom/client';
import RootLayout from './components/RootLayout/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Greetings from './components/functions/Greetings';
import ServiceInfo from './components/functions/ServiceInfo';
import PriceInfo from './components/functions/PriceInfo';
import Reminder from './components/functions/Reminder';
import Thanks from './components/functions/Thanks';
import Survey from './components/functions/Survey';
import CustomerContract from './components/functions/CustomerContract';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Greetings /> },
      { path: "/greetings", element: <Greetings /> },
      { path: "/service-info", element: <ServiceInfo /> },
      { path: "/price-info", element: <PriceInfo /> },
      { path: "/reminder", element: <Reminder /> },
      { path: "/thanks", element: <Thanks /> },
      { path: "/survey", element: <Survey /> },
      { path: "/contract", element: <CustomerContract /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
