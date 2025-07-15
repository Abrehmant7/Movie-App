import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;