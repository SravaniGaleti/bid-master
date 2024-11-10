import { useNavigate, useParams } from "react-router-dom";
import SellerNav from "./SellerNav";
import { useForm } from "react-hook-form";
import { addProducts, singleProduct, updateproduct } from "../api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddProducts = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const seller = JSON.parse(localStorage.getItem("seller"));
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const res = await singleProduct(id);
      setValue("name", res.name);
      setValue("basicCost", res.basicCost);
      // CREATE a new Date object from the ISO string
      const start = new Date(res.startDate);
      const end = new Date(res.endDate);

      // Format the date to match the required input format
      const formattedStartDate = start.toISOString().slice(0, 16);
      const formattedEndDate = end.toISOString().slice(0, 16);

      // Set the value
      setValue("startDate", formattedStartDate);
      setValue("endDate", formattedEndDate);
      setValue("description", res.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (data.startDate > data.endDate) {
        return toast.error("End Date should be greater than Start Date");
      }

      if (id) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("basicCost", data.basicCost);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("description", data.description);
        formData.append("picture", data.picture[0]);

        const res = await updateproduct(formData, id);
        console.log(res);

        toast.success("Product Added Successfully");
        reset();
        navigate("/products");
      } else {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("basicCost", data.basicCost);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("description", data.description);
        formData.append("picture", data.picture[0]);

        const res = await addProducts(formData, seller._id);
        console.log(res);

        toast.success("Product Added Successfully");
        reset();
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SellerNav />
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-white mb-6">
                {id ? "ADD" : "CREATE"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500">Name is required</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="startingBid"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Starting Bid ($)
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="startingBid"
                    type="number"
                    min={0}
                    {...register("basicCost", { required: true })}
                  />
                  {errors.basicCost && (
                    <p className="text-red-500">Starting Bid is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    type="datetime-local"
                    {...register("startDate", { required: true })}
                  />
                  {errors.startDate && (
                    <p className="text-red-500">Start Date is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="endDate"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    End Date
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="endDate"
                    type="datetime-local"
                    {...register("endDate", { required: true })}
                  />
                  {errors.endDate && (
                    <p className="text-red-500">End Date is required</p>
                  )}
                </div>
                {/* picture  */}
                <div className="mb-4">
                  <label
                    htmlFor="picture"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Picture
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="picture"
                    type="file"
                    {...register("picture", { required: id ? false : true })}
                  />
                  {errors.picture && (
                    <p className="text-red-500">Picture is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="description"
                    {...register("description", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                >
                  {id ? "UPDATE" : "CREATE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
