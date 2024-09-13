import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";

const AllRoute: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
