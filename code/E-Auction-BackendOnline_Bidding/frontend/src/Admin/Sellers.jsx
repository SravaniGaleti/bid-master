import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { allSellers, sellerApproval } from "../api/api";
import { toast } from "react-toastify";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);

  const fetchAllSellers = async () => {
    try {
      const res = await allSellers();
      console.log(res);
      setSellers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSellers();
  }, []);

  const handleApproved = async (id) => {
    try {
      const res = await sellerApproval(id);
      fetchAllSellers();
      toast.success("Seller Approved");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">VIEW SELLERS</h2>
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
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr
                key={seller._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {seller.username}
                </th>
                <td className="px-6 py-4">{seller.email}</td>
                <td className="px-6 py-4">{seller.phone}</td>
                <td className="px-6 py-4">
                  {seller.isAccepted ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {!seller.isAccepted && (
                    <button
                      className="text-white bg-green-500 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onClick={() => handleApproved(seller._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
