import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Hero from "./pages/Hero"
import Navbar from "./components/Navbar"
import Create from "./pages/Create"

function App() {
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Box>
  )
}

export default App
