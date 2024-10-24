import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerNav from "./SellerNav";

const UpdateAndDeleteBidDetails = () => {
  const [title, setTitle] = useState("Sample Product");
  const [description, setDescription] = useState("Sample product description");
  const [startingBid, setStartingBid] = useState(100);
  const [endDate, setEndDate] = useState("2024-12-31T23:59");
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  // Handle form submission for updating bid
  const handleUpdate = (e) => {
    e.preventDefault();
    // Logic to update the product auction (e.g., API call)
    console.log("Bid details updated", { title, description, startingBid, endDate });
    navigate("/sellerDashboard");
  };

  // Handle deletion
  const handleDelete = () => {
    // Logic to delete the product auction (e.g., API call)
    console.log("Bid deleted", { title });
    navigate("/sellerDashboard"); // Redirect to seller dashboard after deletion
  };

  return (
    <div>
      <SellerNav />
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Update or Delete Auction
              </h2>

              {/* Show update form when not confirming delete */}
              {!showDeleteConfirm && (
                <>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="startingBid"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        Starting Bid ($)
                      </label>
                      <input
                        id="startingBid"
                        type="number"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        min={0}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="endDate"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        End Date
                      </label>
                      <input
                        id="endDate"
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                    >
                      Update Auction
                    </button>
                  </form>

                  {/* Delete Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300 text-lg font-semibold"
                    >
                      Delete Auction
                    </button>
                  </div>
                </>
              )}

              {/* Delete confirmation section */}
              {showDeleteConfirm && (
                <div>
                  <h3 className="text-2xl font-semibold text-red-500 mb-4">
                    Are you sure you want to delete the auction for "{title}"?
                  </h3>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300 text-lg font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300 text-lg font-semibold"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAndDeleteBidDetails;
