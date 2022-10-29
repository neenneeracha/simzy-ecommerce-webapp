import React from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PaymentMetohd from "../components/PaymentMetohd";

const Checkout = () => {
  return (
    <div>
      <Navbar />
        < PaymentMetohd/>
      <Footer />
    </div>
  );
};

export default Checkout;
