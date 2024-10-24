import React, { useEffect, useState } from "react";
import SellerNav from "./SellerNav";
import { deleteProduct, sellerProducts } from "../api/api";
import { useNavigate } from "react-router-dom";
import { imageURL } from "../api/config";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const seller = JSON.parse(localStorage.getItem("seller"));

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await sellerProducts(seller._id);
      console.log(res, "Products");
      setProducts(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product Deleted Successfully");
      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SellerNav />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold mb-4">VIEW Products</h2>
          {/* Add product button */}
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/addProducts")}
            >
              Add Product
            </button>
          </div>
        </div>
        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3">
                  SR. No
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Basic Cost
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Picture
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : products && products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.basicCost}</td>
                    <td className="p-4">
                      {product.startDate?.date} {product.startDate?.time}
                    </td>
                    <td className="p-4">
                      {product.endDate?.date} {product.endDate?.time}
                    </td>
                    <td className="p-4 text-center flex justify-center items-center">
                      <img
                        src={`${imageURL}/${product.picture}` || ""}
                        alt={product.name}
                        style={{ width: "60px", height: "60px" }}
                      />
                    </td>
                    <td className="p-4 ">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2"
                        onClick={() => navigate(`/editProduct/${product._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md mx-2"
                        onClick={() =>
                          navigate(`/productBidDetails/${product._id}`)
                        }
                      >
                        View Bids
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
