import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HeaderMegaMenu } from './layouts/header/Navbar';

import IndexPage from "./pages/index/Index";
import HealthCheck from "./pages/auth/HealthCheck";

import './assets/scss/main.scss';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <HealthCheck /> */}
          <Routes>
            <Route path="/" element={<IndexPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
