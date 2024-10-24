import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { allWinners } from "../api/api";

const ViewWinner = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchWinners = async () => {
    try {
      setLoading(true);
      const res = await allWinners();
      setMessage(res.msg);
      setWinners(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  console.log(winners);

  return (
    <div>
      <AdminNav />
      <div className="min-h-screen bg-gray-200 p-6">
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-6">View Winner Details</h2>

         {
          message && <p>{message}</p>
         }
          {!message && (winners.length === 0 ? (
            <p>Loading winner details...</p> // Display a loading message while data is being fetched
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {winners?.map((winner) => (
                <div
                  key={winner.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {winner?.productName}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Winner: {winner?.buyerId?.username}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Amount: {winner.bidAmount}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Bid Date / Time : {winner.bidDate} / {winner.bidTime}
                    </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewWinner;
