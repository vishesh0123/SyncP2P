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
import PolybaseAuth from './components/PolybaseAuth'
import PeerDiscovery from './components/PeerDiscovery'
import Main from './pages/main'
import LibP2P from './components/LibP2P'

const polybase = new Polybase()
const auth = new Auth()

const router = createBrowserRouter([
  {
    path: '/app',
    loader: () => ({ message: 'SyncP2P: Authentication' }),
    Component (): JSX.Element {
      const data = useLoaderData() as { message: string }
      return (
        <>
          <h1>{data.message}</h1>
          <PolybaseAuth />
          <PeerDiscovery/>
        </>
      )
    }
  },
  {
    path: '/p2p',
    loader: () => ({ message: 'SyncP2P: Authentication' }),
    Component (): JSX.Element {
      const data = useLoaderData() as { message: string }
      return (
        <>
          <Main/>
        </>
      )
    }
  },
  {
    path: '/libp2p',
    loader: () => ({ message: 'SyncP2P: Authentication' }),
    Component (): JSX.Element {
      const data = useLoaderData() as { message: string }
      return (
        <>
          <LibP2P/>
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
