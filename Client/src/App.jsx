import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'

import Create from './Components/Create'
import Update from './Components/Update'
import User from './Components/User'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Don't forget to import BrowserRouter

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/" element={<User/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
