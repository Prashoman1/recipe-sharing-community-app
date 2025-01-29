export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to{" "}
          <span className="font-semibold text-green-600">
            Recipe Sharing Community
          </span>
          , a place where food lovers come together to share and discover new
          recipes. Our mission is to connect people through the joy of cooking
          and eating.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600">
          We aim to create a space where home cooks and professional chefs alike
          can share their recipes, inspire others, and learn new cooking
          techniques. Our goal is to build a supportive and engaging community
          where food enthusiasts from all backgrounds can connect and celebrate
          their love for cooking.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          {
            title: "Share Recipes",
            description:
              "Post your favorite recipes, share cooking tips, and inspire others with your culinary skills.",
          },
          {
            title: "Discover New Dishes",
            description:
              "Explore a wide variety of recipes from around the world, learn new techniques, and try out different cuisines.",
          },
          {
            title: "Connect with Foodies",
            description:
              "Engage with a passionate community that shares your love for food, exchange ideas, and collaborate on cooking projects.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Alice Johnson", role: "Founder & Chef" },
            { name: "Mark Williams", role: "Community Manager" },
            { name: "Sophia Lee", role: "Recipe Curator" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
