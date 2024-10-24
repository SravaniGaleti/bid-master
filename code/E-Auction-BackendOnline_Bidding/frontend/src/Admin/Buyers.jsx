import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { allBuyers } from "../api/api";

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);

  const fetchAllBuyers = async () => {
    try {
      const res = await allBuyers();
      console.log(res);
      setBuyers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBuyers();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">VIEW BUYERS</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                SR. No
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr
                key={buyer._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {buyer.username}
                </th>
                <td className="px-6 py-4">{buyer.email}</td>
                <td className="px-6 py-4">{buyer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buyers;
