import React from "react";
import { Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Loader/Loading";
import useAuth from "../../../../Hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Amount</th>
              <th>Customer</th>
              <th>Tracking ID</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No payment found
                </td>
              </tr>
            ) : (
              payments.map((p, index) => (
                <tr key={p._id} className="hover">
                  <td>{index + 1}</td>

                  <td className="font-semibold">{p.parcelName}</td>

                  <td>
                    <span className="font-bold">
                      {p.amount.toLocaleString()} BDT
                    </span>
                  </td>

                  <td>{p.customerEmail}</td>

                  <td className="text-sm font-mono">{p.trackingId}</td>

                  <td className="flex items-center gap-2 text-sm font-mono">
                    {p.transactionId.slice(0, 12)}...
                    <Copy
                      size={16}
                      className="cursor-pointer hover:text-primary"
                      onClick={() =>
                        navigator.clipboard.writeText(p.transactionId)
                      }
                    />
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        p.paymentStatus === "paid"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {p.paymentStatus}
                    </span>
                  </td>

                  <td>{new Date(p.paidAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
