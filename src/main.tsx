import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import MainBlock from "./main/main-block.tsx";
import FilmDetails from "./pages/movie-details.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <MainBlock />,
            },
            {
                path: '/films/:id',
                element: <FilmDetails />,
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
