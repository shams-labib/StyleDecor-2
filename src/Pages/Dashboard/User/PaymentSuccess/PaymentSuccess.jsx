import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data?.trackingId,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!paymentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Payment information not found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 text-center transform transition-all duration-500 scale-95 hover:scale-100">
        <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been successfully
          processed.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-gray-700">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {paymentInfo.transactionId}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Parcel Tracking ID:</span>{" "}
            {paymentInfo.trackingId}
          </p>
        </div>

        <Link
          to={"/dashboard"}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
