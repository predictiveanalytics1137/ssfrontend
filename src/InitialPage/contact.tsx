// // import React, { useState } from 'react';
// // import { Mail, Phone, MapPin } from 'lucide-react';

// // const ContactPage: React.FC = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     company: '',
// //     message: ''
// //   });

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Add form submission logic
// //     console.log('Form submitted', formData);
// //     // Reset form after submission
// //     setFormData({
// //       name: '',
// //       email: '',
// //       phone: '',
// //       company: '',
// //       message: ''
// //     });
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-16">
// //       <div className="grid md:grid-cols-2 gap-12">
// //         {/* Contact Information Section */}
// //         <div className="bg-gray-50 p-8 rounded-lg">
// //           <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
          
// //           <div className="space-y-6">
// //             <div className="flex items-center space-x-4">
// //               <Mail className="text-blue-600 w-6 h-6" />
// //               <div>
// //                 <h3 className="font-semibold text-gray-700">Email</h3>
// //                 <p className="text-gray-600">info@pacx.ai</p>
// //                 <p className="text-gray-600">support@pacx.ai</p>
// //               </div>
// //             </div>

// //             <div className="flex items-center space-x-4">
// //               <Phone className="text-blue-600 w-6 h-6" />
// //               <div>
// //                 <h3 className="font-semibold text-gray-700">Phone</h3>
// //                 <p className="text-gray-600">+1 (650) 555-0123</p>
// //                 <p className="text-gray-600">+1 (650) 555-0456</p>
// //               </div>
// //             </div>

// //             <div className="flex items-center space-x-4">
// //               <MapPin className="text-blue-600 w-6 h-6" />
// //               <div>
// //                 <h3 className="font-semibold text-gray-700">Address</h3>
// //                 <p className="text-gray-600">
// //                   500 Oracle Parkway,
// //                   Redwood Shores, CA 94065
// //                   United States
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mt-8 border-t pt-6">
// //             <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Hours</h3>
// //             <div className="text-gray-600">
// //               <p>Monday - Friday: 9:00 AM - 5:00 PM PST</p>
// //               <p>Saturday: 10:00 AM - 2:00 PM PST</p>
// //               <p>Sunday: Closed</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Contact Form Section */}
// //         <div>
// //           <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="grid md:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
// //                 <input
// //                   type="text"
// //                   id="name"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid md:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
// //                 <input
// //                   type="tel"
// //                   id="phone"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="company" className="block text-gray-700 mb-2">Company</label>
// //                 <input
// //                   type="text"
// //                   id="company"
// //                   name="company"
// //                   value={formData.company}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
// //               <textarea
// //                 id="message"
// //                 name="message"
// //                 value={formData.message}
// //                 onChange={handleInputChange}
// //                 rows={5}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 required
// //               ></textarea>
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
// //             >
// //               Send Message
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Optional: Embedded Map */}
// //       <div className="mt-12 bg-gray-100 rounded-lg overflow-hidden">
// //         <iframe
// //           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.4982558259585!2d-122.22125472410645!3d37.54347197980793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbf46f3d05d7f%3A0x8713f2d20ffe88a3!2sOracle%20Headquarters!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
// //           width="100%"
// //           height="450"
// //           style={{ border: 0 }}
// //           allowFullScreen
// //           loading="lazy"
// //         ></iframe>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactPage;

// import React, { useState } from 'react';
// import { Mail, Phone, MapPin } from 'lucide-react';

// const ContactPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     message: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted', formData);
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       company: '',
//       message: ''
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-16">
//       <div className="grid md:grid-cols-2 gap-12">
//         {/* Contact Information Section */}
//         <div className="bg-white p-8 rounded-lg shadow-md">
//           <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
          
//           <div className="space-y-6">
//             <div className="flex items-center space-x-4">
//               <Mail className="text-blue-600 w-6 h-6" />
//               <div>
//                 <h3 className="font-semibold text-gray-700">Email</h3>
//                 <p className="text-gray-600">pacxai1137@gmail.com</p>
//                 <p className="text-gray-600">pacxai05@gmail.com</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Phone className="text-blue-600 w-6 h-6" />
//               <div>
//                 <h3 className="font-semibold text-gray-700">Phone</h3>
//                 <p className="text-gray-600">+91 (863) 932-2137</p>
//                 <p className="text-gray-600">+91 (807) 264-4634</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <MapPin className="text-blue-600 w-6 h-6" />
//               <div>
//                 <h3 className="font-semibold text-gray-700">Address</h3>
//                 <p className="text-gray-600">
//                   Hyderabad, India.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 border-t pt-6">
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Hours</h3>
//             <div className="text-gray-600">
//               <p>Monday - sunday: 9:00 AM - 5:00 PM IST</p>
              
            
//             </div>
//           </div>
//         </div>

//         {/* Contact Form Section */}
//         <div>
//           <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="company" className="block text-gray-700 mb-2">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 rows={5}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Embedded Map */}
//       <div className="mt-12 bg-gray-100 rounded-lg overflow-hidden">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.578957614149!2d78.347060314623!3d17.440081988042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e4a8f5b2b7%3A0x1a9b7c0e5e6f0b2!2sGachibowli%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v169876543210!5m2!1sen!2sus"
//           width="100%"
//           height="450"
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;




import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { API_BASE_URL } from '../constants';
import Navbar2 from '../Navbar/navbar2';

interface ContactForm {
  fullName: string;
  email: string;
  company: string;
  contact: string;
  message: string; // Re-added message field to store in last_name
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    fullName: '',
    email: '',
    company: '',
    contact: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const requestBody = {
      first_name: formData.fullName, // Full Name maps to first_name
      last_name: formData.message,   // Message maps to last_name
      email: formData.email,         // Email maps to email
      company: formData.company,     // Company Name maps to company
      contact: formData.contact,     // Phone Number maps to contact
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookdemo/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "This email is already registered for a demo.") {
          setError("This email is already registered. Please use a different email.");
          return;
        }

        const errorMessages = Object.values(data).flat().join(" ");
        setError(errorMessages || "Failed to submit your request.");
        return;
      }

      console.log("Success:", data);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    
    
    <div className="max-w-6xl mx-auto px-4 py-16">
        
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="text-blue-600 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">pacxai1137@gmail.com</p>
                <p className="text-gray-600">pacxai05@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="text-blue-600 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-gray-700">Phone</h3>
                <p className="text-gray-600">+91 (86) 3932-2147</p>
                <p className="text-gray-600">+91 (80) 7464-4634</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="text-blue-600 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-gray-700">Address</h3>
                <p className="text-gray-600">
                  Gachibowli, Hyderabad, Telangana 500032
                  India
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Hours</h3>
            <div className="text-gray-600">
              <p>Monday - Sunday: 9:00 AM - 7:00 PM IST</p>
              
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact" className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md"
              disabled={isLoading || isSubmitted}
            >
              {isLoading ? 'Submitting...' : isSubmitted ? '✓ Message Sent!' : 'Send Message'}
            </button>

            {/* Error and Success Messages */}
            <div aria-live="polite">
              {error && (
                <div className="text-center text-red-600 font-medium mt-4 bg-red-50 p-2 rounded-md">
                  ❌ {error}
                </div>
              )}
              {isSubmitted && !error && (
                <div className="text-center text-green-600 font-medium mt-4 bg-green-50 p-2 rounded-md">
                  ✓ Your message has been sent! We’ll get back to you soon.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Embedded Map */}
      <div className="mt-12 bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.578957614149!2d78.347060314623!3d17.440081988042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e4a8f5b2b7%3A0x1a9b7c0e5e6f0b2!2sGachibowli%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v169876543210!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;