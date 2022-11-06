import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HeaderMegaMenu } from './layouts/header/Navbar';

import IndexPage from "./pages/index/Index";
import LoginPage from "./pages/auth/Login";
import HealthCheck from "./pages/auth/HealthCheck";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderMegaMenu />
        <HealthCheck />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
