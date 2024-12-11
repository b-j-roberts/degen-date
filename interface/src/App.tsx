import Layout from 'components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
