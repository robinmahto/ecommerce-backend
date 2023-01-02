import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, ErrorPage } from './pages';
import './App.css';

const router = createBrowserRouter([{path: '/', element: <Home/>, errorElement: <ErrorPage/>}])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
