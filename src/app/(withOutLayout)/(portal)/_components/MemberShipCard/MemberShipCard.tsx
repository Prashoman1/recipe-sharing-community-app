// import { useState } from "react";

const MembershipPlans = [
  { duration: "1 Month", price: "200", id: "1m" },
  { duration: "3 Months", price: "400", id: "3m" },
  { duration: "6 Months", price: "600", id: "6m" },
];

const MembershipCard = () => {


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Your Membership Plan</h1>
      <p className="text-gray-600 mb-6  max-w-2xl text-center">
        Unlock premium content and exclusive features by subscribing to one of our membership plans.
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {MembershipPlans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg p-6 shadow-lg text-center bg-white hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800">{plan.duration}</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">BDT  {plan.price} TK</p>
            <button
              // onClick={() => handlePayment(plan.id)}
              className="mt-4 w-full bg-green-500 text-white py-2 px-2 rounded-lg hover:bg-green-600 transition"
            >
              Get Membership
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipCard;