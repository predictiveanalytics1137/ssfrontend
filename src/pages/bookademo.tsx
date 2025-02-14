


// // import React, { useState } from 'react';

// // import { PlayCircle } from 'lucide-react';
// // import { Card, CardContent } from '../components/ui/card';
// // import { Button } from '../components/ui/button';
// // import { Input } from '../components/ui/input';


// // interface DemoForm {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   company: string;
// // }

// // const BookDemoPage = () => {
// //   const [formData, setFormData] = useState<DemoForm>({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     company: ''
// //   });
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     // Simulate API call
// //     await new Promise(resolve => setTimeout(resolve, 1000));
// //     setIsLoading(false);
// //     setIsSubmitted(true);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
// //       <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
// //         <div className="grid lg:grid-cols-2 gap-12 items-center">
// //           {/* Left Section */}
// //           <div className="space-y-8">
// //             <div className="space-y-4">
// //               <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
// //                 Transform Your Data Strategy
// //               </h1>
// //               <p className="text-xl text-gray-600 leading-relaxed">
// //                 Leverage AI-powered analytics to drive business growth and reduce forecasting errors by <span className="font-semibold text-indigo-600">45%</span>
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-2 gap-6">
// //               <Card className="p-6">
// //                 <h3 className="text-3xl font-bold text-indigo-600">220%</h3>
// //                 <p className="text-sm text-gray-600">Average ROI within 18 months</p>
// //               </Card>
// //               <Card className="p-6">
// //                 <h3 className="text-3xl font-bold text-indigo-600">4.8/5</h3>
// //                 <p className="text-sm text-gray-600">Customer satisfaction score</p>
// //               </Card>
// //             </div>

// //             <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5">
// //               <img 
// //                 src="/api/placeholder/800/450"
// //                 alt="PACX Platform Demo"
// //                 className="w-full h-full object-cover transition-opacity hover:opacity-90"
// //               />
// //               <Button
// //                 size="icon"
// //                 variant="secondary"
// //                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/90 hover:bg-white shadow-lg"
// //                 aria-label="Play demo video"
// //               >
// //                 <PlayCircle className="h-8 w-8 text-indigo-600" />
// //               </Button>
// //             </div>

// //             <div className="flex items-center space-x-8">
// //               <img src="/api/placeholder/120/40" alt="G2 Crowd Logo" className="h-10" />
// //               <img src="/api/placeholder/120/40" alt="Capterra Logo" className="h-10" />
// //             </div>
// //           </div>

// //           {/* Right Section */}
// //           <Card className="lg:sticky lg:top-8">
// //             <CardContent className="p-8">
// //               <div className="space-y-6">
// //                 <div className="space-y-2">
// //                   <h2 className="text-2xl font-semibold text-gray-900">
// //                     Schedule Your Free Demo
// //                   </h2>
// //                   <p className="text-gray-600">
// //                     Get a personalized walkthrough of how PACX can transform your analytics strategy
// //                   </p>
// //                 </div>

// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   <div className="grid sm:grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                       <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
// //                       <Input
// //                         id="firstName"
// //                         value={formData.firstName}
// //                         onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
// //                         placeholder="John"
// //                         required
// //                         className="h-12"
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
// //                       <Input
// //                         id="lastName"
// //                         value={formData.lastName}
// //                         onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
// //                         placeholder="Doe"
// //                         required
// //                         className="h-12"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Work Email</label>
// //                     <Input
// //                       type="email"
// //                       id="email"
// //                       value={formData.email}
// //                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                       placeholder="john@company.com"
// //                       required
// //                       className="h-12"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
// //                     <Input
// //                       id="company"
// //                       value={formData.company}
// //                       onChange={(e) => setFormData({ ...formData, company: e.target.value })}
// //                       placeholder="Acme Inc."
// //                       required
// //                       className="h-12"
// //                     />
// //                   </div>

// //                   <Button
// //                     type="submit"
// //                     className="w-full h-12 text-lg"
// //                     disabled={isLoading || isSubmitted}
// //                   >
// //                     {isLoading ? 'Processing...' : isSubmitted ? '✓ Demo Scheduled!' : 'Book Your Demo'}
// //                   </Button>
// //                 </form>

// //                 {isSubmitted && (
// //                   <div className="text-center text-sm text-gray-600">
// //                     Check your email for confirmation and next steps
// //                   </div>
// //                 )}

// //                 <div className="text-center text-sm text-gray-500">
// //                   By scheduling a demo, you agree to our{' '}
// //                   <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
// //                   {' '}and{' '}
// //                   <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookDemoPage;


import React, { useState } from 'react';

import { Play, CheckCircle, BarChart2, Brain, Zap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from 'recharts/types/component/Label';
import { Input } from '../components/ui/input';
// import { error } from 'node:console';

interface DemoForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  contact: string;
}



const BookDemoPage = () => {
  const [formData, setFormData] = useState<DemoForm>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    contact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  


const [error, setError] = useState<string | null>(null);
// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/bookdemo/', { // Update with actual API URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit demo request');
//       }

//       const data = await response.json();
//       console.log('Success:', data);
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError('Failed to submit request. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };


// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const requestBody = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         email: formData.email,
//         company: formData.company,
//         contact: formData.contact,
//     };

//     try {
//         const response = await fetch('http://127.0.0.1:8000/api/bookdemo/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Failed to submit demo request');
//         }

//         const data = await response.json();
//         console.log('Success:', data);
//         setIsSubmitted(true);
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         setError('Failed to submit request. Please try again.');
//     } finally {
//         setIsLoading(false);
//     }
// };



const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);  // Clear previous errors

    const requestBody = {
        first_name: formData.firstName, 
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        contact: formData.contact,
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/bookdemo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle duplicate email case
            if (data.error === "This email is already registered for a demo.") {
                setError("This email is already registered. Please use a different email.");
                return;
            }

            // Display Django validation errors dynamically
            const errorMessages = Object.values(data).flat().join(" ");
            setError(errorMessages || "Failed to submit demo request.");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Redesigned */}
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 rounded-full px-4 py-2">
                <span className="animate-pulse relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                <span className="text-indigo-700 text-sm font-medium">Live Demo Available</span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight">
                Transform Your <br />
                <span className="text-indigo-600">Data Strategy</span> with <br />
                AI-Powered Analytics
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Join industry leaders who've achieved breakthrough results with PACX's predictive analytics platform.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-4xl font-bold">220%</span>
                    <BarChart2 className="h-6 w-6 opacity-75" />
                  </div>
                  <p className="text-sm text-indigo-100">Average ROI within 18 months</p>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-4xl font-bold">45%</span>
                    <Brain className="h-6 w-6 opacity-75" />
                  </div>
                  <p className="text-sm text-purple-100">Reduction in forecast errors</p>
                </div>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Why Industry Leaders Choose PACX</h3>
              <div className="grid gap-4">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-indigo-600" />,
                    title: "Real-time Analytics",
                    description: "Get instant insights from your data with our advanced AI engine"
                  },
                  {
                    icon: <Brain className="h-5 w-5 text-indigo-600" />,
                    title: "Predictive Intelligence",
                    description: "Forecast trends with 95% accuracy using machine learning"
                  },
                  {
                    icon: <CheckCircle className="h-5 w-5 text-indigo-600" />,
                    title: "Enterprise-grade Security",
                    description: "SOC 2 Type II certified with end-to-end encryption"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm">
                    <div className="flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="space-y-6">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                        <img 
                          src={`/api/placeholder/32/32`} 
                          alt={`User ${i + 1}`}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Trusted by 500+ companies</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.9/5 on G2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 p-1">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                <img 
                  src="/api/placeholder/800/450"
                  alt="PACX Platform Demo"
                  className="w-full h-full object-cover opacity-90"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/90 hover:bg-white shadow-lg"
                  aria-label="Play demo video"
                >
                  <Play className="h-8 w-8 text-indigo-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Form (Unchanged) */}
          <Card className="lg:sticky lg:top-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Schedule Your Free Demo
                  </h2>
                  <p className="text-gray-600">
                    Get a personalized walkthrough of how PACX can transform your analytics strategy
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Work Email</label>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      required
                      className="h-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={isLoading || isSubmitted}
                  >
                    {isLoading ? 'Processing...' : isSubmitted ? '✓ Demo Scheduled!' : 'Book Your Demo'}
                  </Button>
                  {error && (
                    <div className="text-center text-red-600 font-medium mt-4">
                        ❌ {error}
                    </div>
                    )}
                </form>

                {isSubmitted && (
                  <div className="text-center text-sm text-gray-600">
                    Check your email for confirmation and next steps
                  </div>
                )}

                <div className="text-center text-sm text-gray-500">
                  By scheduling a demo, you agree to our{' '}
                  <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDemoPage;






// import React, { useState } from 'react';
// import { Play, CheckCircle, BarChart2, Brain, Zap } from 'lucide-react';
// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';

// interface DemoForm {
//   firstName: string;
//   lastName: string;
//   email: string;
//   company: string;
//   contact: string;
// }

// const BookDemoPage = () => {
//   const [formData, setFormData] = useState<DemoForm>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     company: '',
//     contact: '',
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/book-demo/', { // Update with actual API URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit demo request');
//       }

//       const data = await response.json();
//       console.log('Success:', data);
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError('Failed to submit request. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Left Section */}
//           <div className="space-y-10">
//             <div className="space-y-6">
//               <h1 className="text-5xl font-bold leading-tight">
//                 Transform Your <br />
//                 <span className="text-indigo-600">Data Strategy</span> with <br />
//                 AI-Powered Analytics
//               </h1>
//               <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
//                 Join industry leaders who've achieved breakthrough results with PACX's predictive analytics platform.
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-start">
//                     <span className="text-4xl font-bold">220%</span>
//                     <BarChart2 className="h-6 w-6 opacity-75" />
//                   </div>
//                   <p className="text-sm text-indigo-100">Average ROI within 18 months</p>
//                 </div>
//               </Card>
//             </div>
//           </div>

//           {/* Right Section - Form */}
//           <Card className="lg:sticky lg:top-8">
//             <CardContent className="p-8">
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-semibold text-gray-900">Schedule Your Free Demo</h2>
//                 <p className="text-gray-600">
//                   Get a personalized walkthrough of how PACX can transform your analytics strategy.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//                       <Input
//                         id="firstName"
//                         value={formData.firstName}
//                         onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                         placeholder="John"
//                         required
//                         className="h-12"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//                       <Input
//                         id="lastName"
//                         value={formData.lastName}
//                         onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                         placeholder="Doe"
//                         required
//                         className="h-12"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Work Email</label>
//                     <Input
//                       type="email"
//                       id="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="john@company.com"
//                       required
//                       className="h-12"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
//                     <Input
//                       id="company"
//                       value={formData.company}
//                       onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                       placeholder="Acme Inc."
//                       required
//                       className="h-12"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
//                     <Input
//                       id="contact"
//                       value={formData.contact}
//                       onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
//                       placeholder="+1 (555) 123-4567"
//                       required
//                       className="h-12"
//                     />
//                   </div>

//                   <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading || isSubmitted}>
//                     {isLoading ? 'Processing...' : isSubmitted ? '✓ Demo Scheduled!' : 'Book Your Demo'}
//                   </Button>
//                 </form>

//                 {isSubmitted && (
//                   <div className="text-center text-green-600 font-medium mt-4">
//                     ✅ Demo request submitted successfully! Check your email for confirmation.
//                   </div>
//                 )}

//                 {error && (
//                   <div className="text-center text-red-600 font-medium mt-4">
//                     ❌ {error}
//                   </div>
//                 )}

//                 <div className="text-center text-sm text-gray-500">
//                   By scheduling a demo, you agree to our{' '}
//                   <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
//                   {' '}and{' '}
//                   <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDemoPage;
