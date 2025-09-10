import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import  Users  from './pages/Users'
import  Posts  from './pages/Posts'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  )
}

export default App
