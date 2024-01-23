import React from 'react'
import {Button} from 'react-bootstrap'

function Home({setLoginUser}) {
  return (
    <div>
      <h1>Home</h1>
    <Button onClick={() => setLoginUser({})} className="mt-4 mb-4" variant="primary">Logout</Button>
    </div>
  )
}

export default Home