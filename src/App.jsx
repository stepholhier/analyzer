import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Terms from "./components/Politics/Terms";
import Privacy from "./components/Politics/Privacy";
import Account from "./components/My Account/Account";
import PrivateRoute from "./components/My Account/PrivateRoute";

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderFooter = ["/", "/account"].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* ✅ Rota protegida */}
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />

          <Route path="/termos" element={<Terms />} />
          <Route path="/privacidade" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
