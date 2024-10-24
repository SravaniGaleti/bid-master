import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import { allBidPayments } from "../api/api";

const ViewPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await allBidPayments();
      console.log(res);
      setMessage(res.msg);
      setPayments(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  console.log(payments);

  return (
    <div>
      <AdminNav />
      <div className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">View Payment Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {message && <p>{message}</p>}
          {!message &&
            (payments.length > 0 ? (
              payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {payment?.productName}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Buyer:</span>{" "}
                    {payment?.buyerId?.username}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Seller:</span> $
                    {payment?.sellerName}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Basic Amount:</span> $
                    {payment?.basicCost}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Amount:</span> $
                    {payment?.amount}
                  </p>
                  {/* <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Payment Date:</span>{" "}
                    {payment?.paymentDate}
                  </p> */}
                </div>
              ))
            ) : (
              <p>Loading payment details...</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;
