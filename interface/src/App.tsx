import Layout from 'components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DashboardPage from './pages/Dashboard'
import LaunchPage from './pages/Launch'
import SwipePage from './pages/Swipe'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: '/swipe',
    element: (
      <Layout>
        <SwipePage />
      </Layout>
    ),
  },
  {
    path: '/launch',
    element: (
      <Layout>
        <LaunchPage />
      </Layout>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
