// import axios from "axios";
// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { act } from "react-dom/test-utils";

// const Contact = () => {
//   const [Email, setEmail] = useState("");
//   const [Message, setMessage] = useState("");
//   const [Name, setName] = useState("");
//   const Post = async () => {
//     const res = await axios.post("http://localhost:8000/contactus/add", {
//       name: Name,
//       email: Email,
//       message: Message,
//     });
//     console.log(res);
//   };

//   const [Time, setTime] = useState(false);
//   const Send = () => {
//     setTime(true);
//     Post();
//     setTimeout(() => {
//       setTime(false);
//       setEmail("");
//       setName("");
//       setMessage("");
//     }, 3000);
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     console.log("fdfddf");
//   }, []);
//   const inputRef = useRef("");
//   const nameRef = useRef("");
//   const messRef = useRef("");

//   return (
//     <section class="text-gray-600 body-font relative">
//       {Time ? (
//         <div className="bg-white border-8 border-red-600 w-[300px] h-[500px] z-50 inset-0 absolute m-auto flex flex-col p-4 overflow-y-auto">
//           <h1 className="text-2xl mb-4 text-red-500 font-bold text-center">
//             Thanks for contacting us
//           </h1>
//           <p className="text-center">We will reply to you soon!!</p>
//           <span className="text-red-500 text-2xl mt-5">Email: </span>
//           {Email}

//           <p className="mt-4 mb-5 w-[100%]">
//             <span className="text-red-500 text-2xl mt-5">Message: </span>
//             <br />

//             {Message}
//           </p>
//         </div>
//       ) : (
//         <></>
//       )}
//       <div class="absolute inset-0 bg-gray-300">
//         <iframe
//           width="100%"
//           height="100%"
//           frameborder="0"
//           marginheight="0"
//           marginwidth="0"
//           title="map"
//           scrolling="no"
//           src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
//         ></iframe>
//       </div>
//       <div class="container px-5 py-24 mx-auto flex">
//         <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
//           <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
//             Contact Us
//           </h2>
//           <p class="leading-relaxed mb-5 text-gray-600">
//             Send your query to through email.
//           </p>
//           <div class="relative mb-4">
//             <label for="email" class="leading-7 text-sm text-gray-600">
//               Name
//             </label>
//             <input
//               type="email"
//               required
//               id="email"
//               name="email"
//               class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               value={Name}
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//             />
//           </div>
//           <div class="relative mb-4">
//             <label for="email" class="leading-7 text-sm text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               id="email"
//               name="email"
//               class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               value={Email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//           </div>

//           <div class="relative mb-4">
//             <label for="message" class="leading-7 text-sm text-gray-600">
//               Message
//             </label>
//             <textarea
//               id="message"
//               required
//               value={Message}
//               onChange={(e) => {
//                 setMessage(e.target.value);
//               }}
//               name="message"
//               class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
//             ></textarea>
//           </div>
//           <button
//             class="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
//             onClick={Send}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;


import React from "react";
import "../App.css";

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Contact Header Section */}
      <div className="w-full bg-[var(--red)] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Our Housing Data Team
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Have questions about Canada's housing data? Want to collaborate or report an issue?
            Reach out to our team of housing researchers and data specialists.
          </p>
        </div>
      </div>

      {/* Contact Content Section */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-[var(--red)]">
              Send Us a Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--red)] focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--red)] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--red)] focus:border-transparent"
                  placeholder="Tell us about your housing data questions or collaboration ideas..."
                ></textarea>
              </div>
              
              <button
                type="button"
                className="w-full bg-[var(--red)] hover:bg-[var(--dark-red)] text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--red)]">
                Get In Touch
              </h3>
              <p className="text-lg text-gray-700">
                We welcome questions, feedback, and collaboration opportunities related to 
                Canada's housing data and policy solutions.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[var(--red)] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Email Us</h4>
                  <p className="text-gray-600">housingdata@canadahousing.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[var(--red)] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Our Office</h4>
                  <p className="text-gray-600">
                    123 Housing Data Way<br />
                    Toronto, ON M5V 3L9<br />
                    Canada
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[var(--red)] p-3 rounded-full text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Call Us</h4>
                  <p className="text-gray-600">+1 (416) 555-0199</p>
                  <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-5pm EST</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="text-xl font-semibold mb-4">Follow Our Housing Research</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-[var(--red)] hover:text-[var(--dark-red)]">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-[var(--red)] hover:text-[var(--dark-red)]">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-96 bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2692505416353!2d-79.38924548450267!3d43.64256617912169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7581!2sCN%20Tower!5e0!3m2!1sen!2sca!4v1620000000000!5m2!1sen!2sca" 
          width="100%" 
          height="100%" 
          style={{border:0}}
          allowFullScreen="" 
          loading="lazy"
          title="Toronto Office Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;