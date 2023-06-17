import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData
} from 'react-router-dom'
import './App.css'
import { PolybaseProvider, AuthProvider } from '@polybase/react'
import { Polybase } from '@polybase/client'
import { Auth } from '@polybase/auth'
import LandingPage from './pages/LandingPage'
import SyncP2P from './pages/SyncP2P'

const polybase = new Polybase()
const auth = new Auth()

const router = createBrowserRouter([
  {
    path: '/syncp2p',
    loader: () => ({ message: 'SyncP2P: Authentication' }),
    Component (): JSX.Element {
      const data = useLoaderData() as { message: string }
      return (
        <>
          <SyncP2P/>
        </>
      )
    }
  },
  {
    path: '/',
    loader: () => ({ message: 'SyncP2P: Authentication' }),
    Component (): JSX.Element {
      const data = useLoaderData() as { message: string }
      return (
        <>
          <LandingPage/>
        </>
      )
    }
  }
])


function App(): JSX.Element {
  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        
      </AuthProvider>
    </PolybaseProvider>
  )
}

export default App
