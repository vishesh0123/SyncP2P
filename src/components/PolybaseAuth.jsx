import React from 'react'
import { useAuth } from '@polybase/react'

export default function PolybaseAuth() {
  const { auth, state } = useAuth()
  return (
    <>
      <div>PolybaseAuth</div>
      <button onClick={() => auth.signIn()}>SignIn</button>
      <button onClick={() => auth.signOut()}>signOut</button>
      {state && (
        <>
          <p>{state.email}</p>
          <p>{state.publicKey}</p>
        </>
      )}
    </>
  )
}
