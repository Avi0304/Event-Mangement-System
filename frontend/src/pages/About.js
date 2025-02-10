import React from "react";
import useTitle from "../hooks/useTitle";

const About = () => {

  useTitle("Eventify - About Us")
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/*  Hero Section */}
      <section className="relative flex items-center justify-center h-96 bg-cover bg-center bg-[url('https://source.unsplash.com/1600x900/?conference,event')]" style={{ backgroundImage: "url('https://eventsmanagementkerala.com/wp-content/uploads/2023/05/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees.webp", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">About Eventify</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Empowering seamless event experiences with technology.
          </p>
        </div>
      </section>

      {/*  Our Mission Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-teal-400">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-300">
          At <b>Eventify, we believe in making event management effortless and efficient.</b>
          Whether you're organizing a <b>corporate conference, a wedding, or a local meet-up,</b> our platform provides a seamless solution for <b>managing attendees, schedules, and real-time updates.</b>
        </p>
      </section>

      {/*  Why Choose Us Section */}
      <section className="py-16 bg-gray-800 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-teal-400">Why Choose Eventify?</h2>
        <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto">
          Whether you're hosting a corporate conference, a social gathering, or a community meet-up, Eventify streamlines every step of the event planning process.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8 text-center">

          {/* Hassle-Free Management */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition">
            <h3 className="text-xl font-semibold">📅 Hassle-Free Event Management</h3>
            <p className="mt-2 text-gray-300">
              Create, edit, and manage events with just a few clicks. Our intuitive interface ensures that planning your event is stress-free and efficient.
            </p>
          </div>

          {/* Real-Time Updates */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition">
            <h3 className="text-xl font-semibold">🌍 Real-Time Updates & Notifications</h3>
            <p className="mt-2 text-gray-300">
              Stay ahead with instant attendee tracking, live notifications, and real-time updates to ensure smooth event execution.
            </p>
          </div>

          {/* Secure & Reliable */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition">
            <h3 className="text-xl font-semibold">🔒 Secure & Reliable Platform</h3>
            <p className="mt-2 text-gray-300">
              Your data is protected with top-tier security measures, ensuring privacy for both organizers and attendees.
            </p>
          </div>

          {/* Easy Guest Registration */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition">
            <h3 className="text-xl font-semibold">📝 Easy Registration & Check-In</h3>
            <p className="mt-2 text-gray-300">
              Simplify event access with quick registrations, digital tickets, and hassle-free check-in for attendees.
            </p>
          </div>

          {/* Seamless Payment Integration */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition">
            <h3 className="text-xl font-semibold">💳 Seamless Payment Integration</h3>
            <p className="mt-2 text-gray-300">
              Accept ticket payments effortlessly with secure online transactions and multiple payment gateway options.
            </p>
          </div>

          {/* Custom Branding & Themes */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition">
            <h3 className="text-xl font-semibold">🎨 Custom Branding & Themes</h3>
            <p className="mt-2 text-gray-300">
              Personalize your event page with custom branding, themes, and layouts that align with your vision.
            </p>
          </div>

        </div>
      </section>


      {/*  Meet the Team Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-teal-400">Meet Our Team</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8 text-center">
          {/** Team Member Card */}
          <TeamCard
            name="John Doe"
            role="Founder & CEO"
            imgSrc="https://i.pravatar.cc/200?img=8"
          />
          <TeamCard
            name="Jane Smith"
            role="Lead Developer"
            imgSrc="https://i.pravatar.cc/200?img=1"
          />
          <TeamCard
            name="Robert Brown"
            role="UI/UX Designer"
            imgSrc="https://i.pravatar.cc/200?img=7"
          />
        </div>
      </section>


    </div>
  );
};

/**  TeamCard Component for Cleaner Code */
const TeamCard = ({ name, role, imgSrc }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-teal-500 transition duration-300">
      <img
        src={imgSrc}
        alt={name}
        className="mx-auto w-32 h-32 rounded-full border-4 border-teal-500 shadow-lg transition hover:scale-110"
      />
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-400">{role}</p>
    </div>
  );
};

export default About;
