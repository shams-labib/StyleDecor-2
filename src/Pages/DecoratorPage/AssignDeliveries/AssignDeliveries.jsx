import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { PackageCheck, Boxes } from "lucide-react";
import Loading from "../../Loader/Loading";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["decorators", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user?.email}`
      );
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status };

    let message = `Parcel status updated to ${status.split("-").join(" ")}`;

    axiosSecure
      .patch(`/bookings/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
            position: "top",
            toast: true,
          });
        }
      });
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div className="flex justify-center md:items-center gap-3 mb-6">
        <Boxes className="w-10 h-10 text-blue-600" />
        <h2 className="md:text-4xl text-3xl font-bold text-center">
          Assigned Parcels ({parcels.length})
        </h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 text-gray-700 text-base">
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Tracking ID</th>
              <th>Category</th>
              <th>Location</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>

                {/* Image + parcel name */}
                <td className="flex items-center gap-3">
                  <img
                    src={parcel.image || "/default-image.png"}
                    alt={parcel.parcelName}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />
                  <span className="font-semibold">{parcel.decoratorName}</span>
                </td>

                <td className="font-mono">{parcel.trackingId}</td>

                <td>
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {parcel.category}
                  </span>
                </td>

                <td>{parcel.location}</td>
                <td className="font-bold">{parcel.price} BDT</td>

                {/* Status / Confirm */}
                <td>
                  {parcel.deliveryStatus === "materials-prepared" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(
                            parcel,
                            "on-the-way-to-venue"
                          )
                        }
                        className="btn btn-sm bg-blue-600 text-white"
                      >
                        Accept
                      </button>
                      <button className="btn btn-sm bg-yellow-400 ms-2">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {parcel.deliveryStatus}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td>
                  {parcel.deliveryStatus === "on-the-way-to-venue" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "setup-in-progress")
                      }
                      className="btn btn-primary btn-sm"
                    >
                      Mark In-Process
                    </button>
                  )}

                  {parcel.deliveryStatus === "setup-in-progress" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "Completed")
                      }
                      className="btn btn-success btn-sm"
                    >
                      Mark Completed
                    </button>
                  )}

                  {parcel.deliveryStatus === "Completed" && (
                    <button className="btn btn-sm bg-green-300 rounded-lg">
                      <PackageCheck className="w-4 h-4 inline me-1" />
                      Done
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

export default AssignDeliveries;
