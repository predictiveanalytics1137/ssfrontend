// import React from 'react';
// // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// // import { Card, CardContent, CardTitle } from '@/components/ui/card';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

// // Team Member Interface
// interface TeamMember {
//   name: string;
//   role: string;
//   bio: string;
//   imageUrl: string;
// }

// // Team Members Data
// const teamMembers: TeamMember[] = [
//   {
//     name: "Sandeep Raju",
//     role: "Co-founder",
//     bio: "Alex is a visionary data scientist with over 15 years of experience in predictive analytics and machine learning. He's passionate about transforming complex data into actionable insights.",
//     imageUrl: "src/assets/983928.jpg"
//   },
//   {
//     name: "Sai Ram",
//     role: "Co-founder",
//     bio: "Dr. Patel brings deep expertise in AI and statistical modeling. She has published numerous research papers and holds multiple patents in predictive technology.",
//     imageUrl: "src/assets/983928.jpg"
//   },
// //   {
// //     name: "Raj Gupta",
// //     role: "COO",
// //     bio: "Raj is an operations expert with a track record of scaling technology companies. He ensures PACX maintains the highest standards of efficiency and compliance.",
// //     imageUrl: "/api/placeholder/400/400"
// //   }
// ];

// const AboutPage: React.FC = () => {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <section className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-4">We Pioneer Predictive Analytics</h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           Founded in 2022, PACX is revolutionizing how businesses leverage data. 
//           Our cutting-edge predictive analytics solutions transform raw data into 
//           strategic insights that drive decision-making.
//         </p>
//       </section>

//       <section className="mb-12">
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
//             <p className="text-gray-700">
//               To empower organizations with intelligent, data-driven solutions 
//               that predict trends, mitigate risks, and unlock unprecedented 
//               business opportunities.
//             </p>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
//             <p className="text-gray-700">
//               To be the global leader in predictive analytics, consistently 
//               delivering innovative technologies that transform complex data 
//               into actionable intelligence.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-bold text-center mb-8">Our Leadership</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {teamMembers.map((member) => (
//             <Card key={member.name} className="text-center">
//               <CardHeader>
//                 <img 
//                   src={member.imageUrl} 
//                   alt={member.name} 
//                   className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
//                 />
//                 <CardTitle>
//                   <div className="text-xl font-semibold">{member.name}</div>
//                   <div className="text-sm text-gray-500">{member.role}</div>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">{member.bio}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       <section className="text-center mt-12">
//         <h2 className="text-2xl font-semibold mb-4">Our Initiatives</h2>
//         <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
//           <div className="bg-gray-100 p-6 rounded-lg">
//             <h3 className="font-bold mb-2">Research</h3>
//             <p>Continuous innovation in AI and machine learning technologies</p>
//           </div>
//           <div className="bg-gray-100 p-6 rounded-lg">
//             <h3 className="font-bold mb-2">Education</h3>
//             <p>Workshops and training programs in predictive analytics</p>
//           </div>
//           <div className="bg-gray-100 p-6 rounded-lg">
//             <h3 className="font-bold mb-2">Community</h3>
//             <p>Supporting emerging data scientists and analysts</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;



// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
// // import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';


// // Team Member Interface
// interface TeamMember {
//   name: string;
//   role: string;
//   shortBio: string;
//   fullBio: string;
//   imageUrl: string;
// }

// // Team Members Data
// const teamMembers: TeamMember[] = [
//   {
//     name: "Sandeep Raju",
//     role: "Co-founder",
//     shortBio: "Pioneering data science and strategic vision",
//     fullBio: "Sandeep is a visionary leader with over 15 years of experience in predictive analytics. He has successfully transformed complex data challenges into strategic business solutions across multiple industries.",
//     imageUrl: "src/assets/983928.jpg"
//   },
//   {
//     name: "Sai Ram",
//     role: "Co-founder",
//     shortBio: "Expert in AI and machine learning",
//     fullBio: "Sai Ram brings deep expertise in artificial intelligence and statistical modeling. With multiple research publications and a track record of innovative technological solutions, he drives PACX's technological frontiers.",
//     imageUrl: "src/assets/983928.jpg"
//   }
// ];

// const AboutPage: React.FC = () => {
//   const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <section className="text-center mb-16">
//         <h1 className="text-4xl font-bold mb-4 text-gray-800">We Pioneer Predictive Analytics</h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//           Founded in 2022, PACX is revolutionizing how businesses leverage data. 
//           Our cutting-edge predictive analytics solutions transform raw data into 
//           strategic insights that drive decision-making.
//         </p>
//       </section>

//       <section className="mb-16">
//         <div className="grid md:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               To empower organizations with intelligent, data-driven solutions 
//               that predict trends, mitigate risks, and unlock unprecedented 
//               business opportunities.
//             </p>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h2>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               To be the global leader in predictive analytics, consistently 
//               delivering innovative technologies that transform complex data 
//               into actionable intelligence.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Leadership</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           {teamMembers.map((member) => (
//             <div 
//               key={member.name} 
//               className="flex items-center space-x-6 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
//             >
//               <img 
//                 src={member.imageUrl} 
//                 alt={member.name} 
//                 className="w-32 h-32 rounded-full object-cover"
//               />
//               <div>
//                 <div className="text-xl font-semibold text-gray-800">{member.name}</div>
//                 <div className="text-sm text-gray-500 mb-2">{member.role}</div>
//                 <p className="text-gray-600 mb-4">{member.shortBio}</p>
//                 <button 
//                   onClick={() => setSelectedMember(member)}
//                   className="text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Bio
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Bio Dialog */}
//       {selectedMember && (
//         <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>
//                 <div className="text-2xl">{selectedMember.name}</div>
//               </DialogTitle>
//             </DialogHeader>
//             <div className="text-gray-700">{selectedMember.fullBio}</div>
//           </DialogContent>
//         </Dialog>
//       )}

//       <section className="mt-16">
//         <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Our Initiatives</h2>
//         <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
//           <div className="bg-gray-100 p-6 rounded-lg text-center">
//             <h3 className="font-bold mb-2 text-gray-800">Research</h3>
//             <p className="text-gray-600">Continuous innovation in AI and machine learning technologies</p>
//           </div>
//           <div className="bg-gray-100 p-6 rounded-lg text-center">
//             <h3 className="font-bold mb-2 text-gray-800">Education</h3>
//             <p className="text-gray-600">Workshops and training programs in predictive analytics</p>
//           </div>
//           <div className="bg-gray-100 p-6 rounded-lg text-center">
//             <h3 className="font-bold mb-2 text-gray-800">Community</h3>
//             <p className="text-gray-600">Supporting emerging data scientists and analysts</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;
import React, { useState } from 'react';
import Navbar2 from '../Navbar/navbar2';
import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon from react-icons

// Team Member Interface
interface TeamMember {
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  imageUrl: string;
  linkedinUrl: string; // Add LinkedIn URL field
}

// Team Members Data (with LinkedIn URLs)
const teamMembers: TeamMember[] = [
  {
    name: "Sandeep Raju",
    role: "Co-founder | Developer",
    shortBio: "Helping build PACX to make AI/ML easy for everyone",
    fullBio: "Sandeep, a co-founder of PACX, is a seasoned software developer with a deep passion for crafting innovative solutions. With years of hands-on experience in the industry, he has honed his skills in building software that tackles real-world challenges. His work in machine learning sparked the vision for PACX—a platform that makes predictive analytics simple and accessible for businesses. Sandeep thrives on turning complex ideas into practical tools, driven by a commitment to empower users with technology that delivers results.",
    imageUrl: "src/assets/sandeep.jpg", // Replace with actual image
    linkedinUrl: "https://www.linkedin.com/in/sandeep-raju-7a17521b5/", // Replace with actual LinkedIn URL
  },
  {
    name: "Sai Ram",
    role: "Co-founder | Developer",
    shortBio: "Working on PACX to bring AI/ML to non-experts",
    fullBio: "Sai Ram, co-founder of PACX, is an experienced software developer fueled by a passion for making technology work for everyone. Through years of coding and exploring AI and Machine Learning, he identified a gap: powerful analytics were out of reach for most businesses. This inspired him to co-create PACX, where he focuses on developing software that simplifies AI and Machine Learning without sacrificing impact. Sai ram is dedicated to building intuitive solutions that help users solve problems and make decisions with confidence",
    imageUrl: "src/assets/sai.jpg", // Replace with actual image
    linkedinUrl: "https://www.linkedin.com/in/sai-ram-7150a1169/", // Replace with actual LinkedIn URL
  },
];

const AboutPage: React.FC = () => {
  const [showFullBio, setShowFullBio] = useState<{ [key: string]: boolean }>({});

  const toggleFullBio = (name: string) => {
    setShowFullBio(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar2 />

      {/* Hero Section with added top margin */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">We’re making AI and predictive analytics simple for everyone.</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Founded in 2024, PACX is driven by a mission to make predictive analytics accessible to all users, including non-technical individuals. Unlike existing platforms that cater to data science experts, we’re building solutions that empower everyone to transform raw data into strategic insights with ease.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To empower organizations with intelligent, data-driven solutions that predict trends, mitigate risks, and unlock unprecedented business opportunities.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the global leader in predictive analytics, consistently delivering innovative technologies that transform complex data into actionable intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section with LinkedIn Icon */}
      <section className="py-16 border-t border-gray-200">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">Our Leadership</h2>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-40 h-40 rounded-full object-cover mx-auto mb-4 filter grayscale hover:filter-none transition-all duration-300"
              />
              <div className="flex items-center justify-center mb-1">
                <div className="text-2xl font-bold">{member.name}</div>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
              <div className="text-sm text-gray-500 mb-4">{member.role}</div>
              <p className="text-gray-600 mb-4">{member.shortBio}</p>
              <button
                onClick={() => toggleFullBio(member.name)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showFullBio[member.name] ? 'Hide Bio' : 'Show Bio'}
              </button>
              {showFullBio[member.name] && (
                <p className="mt-4 text-gray-600">{member.fullBio}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Initiatives Section */}
      {/* <section className="py-16 border-t border-gray-200">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Initiatives</h2>
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-bold mb-2">Research</h3>
            <p className="text-gray-600">Continuous innovation in AI and machine learning technologies</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Education</h3>
            <p className="text-gray-600">Workshops and training programs in predictive analytics</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Community</h3>
            <p className="text-gray-600">Supporting emerging data scientists and analysts</p>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-16 text-center border-t border-gray-200">
        <h2 className="text-3xl font-serif font-bold mb-4">Explore More</h2>
        <p className="text-gray-600 mb-8">Dive into our latest insights or see how we’re making an impact.</p>
        {/* <div className="space-x-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Our Blog</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Case Studies</a>
        </div> */}
      </section>
    </div>
  );
};

export default AboutPage;