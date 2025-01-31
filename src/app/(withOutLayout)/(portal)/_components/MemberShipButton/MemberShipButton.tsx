import Link from "next/link";

const MembershipButton = () => {
  return (
    <Link
      href={`/membership`}
      className="px-6 py-2 text-white font-semibold text-sm rounded-full 
        bg-green-500 border-2 border-green-700 shadow-lg
        animate-bounce-custom transition-all duration-300 
        hover:scale-105 hover:bg-green-600 hover:border-green-800"
    >
      🎉 Membership Active
    </Link>
  );
};

export default MembershipButton;
