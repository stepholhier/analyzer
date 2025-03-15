import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Terms from "./components/Politics/Terms";
import Privacy from "./components/Politics/Privacy";

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderFooter = location.pathname === "/";

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/privacidade" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired, // Define que children é obrigatório
};

export default App;
