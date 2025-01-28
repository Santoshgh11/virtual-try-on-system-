// import React, { useState } from 'react';
// import VirtualTryOn from '../components/VirtualTryOn/VirtualTryOn';
// import OutfitSuggestions from '../components/OutfitSuggestions/OutfitSuggestions';

// const ResultPage = () => {
//   const [selectedOutfit, setSelectedOutfit] = useState('');
//   const [aiRecommendations, setAiRecommendations] = useState([]);

//   const handleOutfitSelection = (event) => {
//     const outfitType = event.target.value;
//     setSelectedOutfit(outfitType);

//     // Simulating AI recommendations based on the selected outfit
//     const recommendations = outfitType === 'casual' 
//       ? [{ id: 1, name: 'Casual Shirt', image: '/assets/casual_shirt.jpg' }]
//       : [{ id: 1, name: 'Formal Suit', image: '/assets/formal_suit.jpg' }];
//     setAiRecommendations(recommendations);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Half: 3D Model */}
//       <div className="w-1/2 border-r-2 border-gray-300 flex items-center justify-center bg-white p-8">
//         <VirtualTryOn selectedOutfit={selectedOutfit} />
//       </div>

//       {/* Right Half: Outfit Suggestions and AI Recommendations */}
//       <div className="w-1/2 flex flex-col">
//         {/* Outfit Suggestions */}
//         <div className="h-2/3 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Outfit Suggestions</h2>
//           <div>
//             <input
//               type="radio"
//               id="casual"
//               name="outfit"
//               value="casual"
//               checked={selectedOutfit === 'casual'}
//               onChange={handleOutfitSelection}
//             />
//             <label htmlFor="casual" className="ml-2">Casual Outfit</label>
//             <input
//               type="radio"
//               id="formal"
//               name="outfit"
//               value="formal"
//               checked={selectedOutfit === 'formal'}
//               onChange={handleOutfitSelection}
//               className="ml-4"
//             />
//             <label htmlFor="formal" className="ml-2">Formal Outfit</label>
//           </div>
//           {selectedOutfit && (
//             <div className="mt-4">
//               <h3 className="text-xl font-bold">Selected Outfit: {selectedOutfit}</h3>
//               <img
//                 src={selectedOutfit === 'casual' ? '/assets/casual_shirt.jpg' : '/assets/formal_suit.jpg'}
//                 alt={selectedOutfit}
//                 className="w-full h-48 object-cover rounded-lg mt-4"
//               />
//             </div>
//           )}
//         </div>

//         {/* AI Recommendations */}
//         <div className="h-1/3 bg-white p-6 rounded-lg shadow-lg mt-4">
//           <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
//           {aiRecommendations.length > 0 ? (
//             aiRecommendations.map((item) => (
//               <div key={item.id} className="mb-4">
//                 <h3 className="text-lg">{item.name}</h3>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//               </div>
//             ))
//           ) : (
//             <p>No recommendations yet. Select an outfit to get suggestions.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPage;






// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import VirtualTryOn from '../components/VirtualTryOn/VirtualTryOn';
// import OutfitSuggestions from '../components/OutfitSuggestions/OutfitSuggestions';

// const ResultPage = () => {
//   const location = useLocation();
//   const scanData = location.state?.scanResponse || {};
  
//   const [selectedOutfit, setSelectedOutfit] = useState('');
//   const [aiRecommendations, setAiRecommendations] = useState([]);

//   useEffect(() => {
//     if (scanData.success && scanData.recommendations) {
//       setAiRecommendations(scanData.recommendations);
//     }
//   }, [scanData]);

//   const handleOutfitSelection = (event) => {
//     const outfitType = event.target.value;
//     setSelectedOutfit(outfitType);

//     // Dynamically set AI recommendations based on selection
//     const recommendations =
//       outfitType === 'casual'
//         ? [{ id: 1, name: 'Casual Shirt', image: '/assets/casual_shirt.jpg' }]
//         : [{ id: 1, name: 'Formal Suit', image: '/assets/formal_suit.jpg' }];
        
//     setAiRecommendations(recommendations);
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100 p-6">
//       {/* Left Side - 3D Virtual Try-On */}
//       <div className="w-1/2 border-r-2 border-gray-300 flex items-center justify-center bg-white p-8 shadow-lg">
//         <VirtualTryOn selectedOutfit={selectedOutfit} />
//       </div>

//       {/* Right Side - Outfit Suggestions & AI Recommendations */}
//       <div className="w-1/2 flex flex-col space-y-6">
        
//         {/* Outfit Suggestions */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Outfit Suggestions</h2>
//           <div className="flex space-x-4">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 id="casual"
//                 name="outfit"
//                 value="casual"
//                 checked={selectedOutfit === 'casual'}
//                 onChange={handleOutfitSelection}
//                 className="mr-2"
//               />
//               Casual Outfit
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 id="formal"
//                 name="outfit"
//                 value="formal"
//                 checked={selectedOutfit === 'formal'}
//                 onChange={handleOutfitSelection}
//                 className="mr-2"
//               />
//               Formal Outfit
//             </label>
//           </div>

//           {selectedOutfit && (
//             <div className="mt-4">
//               <h3 className="text-xl font-bold">Selected Outfit: {selectedOutfit}</h3>
//               <img
//                 src={selectedOutfit === 'casual' ? '/assets/casual_shirt.jpg' : '/assets/formal_suit.jpg'}
//                 alt={selectedOutfit}
//                 className="w-full h-48 object-cover rounded-lg mt-4"
//               />
//             </div>
//           )}
//         </div>

//         {/* AI Recommendations */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
//           {aiRecommendations.length > 0 ? (
//             <div className="grid grid-cols-2 gap-4">
//               {aiRecommendations.map((item) => (
//                 <div key={item.id} className="p-4 bg-gray-50 rounded-lg shadow">
//                   <h3 className="text-lg font-semibold">{item.name}</h3>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-32 object-cover rounded-lg mt-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No recommendations yet. Select an outfit to get suggestions.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPage;





import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VirtualTryOn from '../components/VirtualTryOn/VirtualTryOn';

const ResultPage = () => {
  const location = useLocation();
  const scanData = location.state?.scanResponse || { recommendations: [] };
  
  const [selectedOutfit, setSelectedOutfit] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState([]);

  useEffect(() => {
    if (scanData.success && scanData.recommendations) {
      setAiRecommendations(scanData.recommendations);
    }
  }, [scanData]);

  const handleOutfitSelection = (event) => {
    const outfitType = event.target.value;
    setSelectedOutfit(outfitType);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-50 to-gray-200 p-10">
      
      {/* Left Side - 3D Virtual Try-On */}
      <div className="w-1/2 border-r-2 border-gray-300 flex items-center justify-center bg-white p-10 shadow-2xl rounded-lg">
        <VirtualTryOn selectedOutfit={selectedOutfit} />
      </div>

      {/* Right Side - Outfit Suggestions & AI Recommendations */}
      <div className="w-1/2 flex flex-col space-y-6 p-6">
        
        {/* Outfit Suggestions */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Outfit Suggestions</h2>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                id="casual"
                name="outfit"
                value="casual"
                checked={selectedOutfit === 'casual'}
                onChange={handleOutfitSelection}
                className="mr-2 accent-blue-600"
              />
              Casual Outfit
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                id="formal"
                name="outfit"
                value="formal"
                checked={selectedOutfit === 'formal'}
                onChange={handleOutfitSelection}
                className="mr-2 accent-blue-600"
              />
              Formal Outfit
            </label>
          </div>

          {selectedOutfit && (
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-gray-700">Selected Outfit: {selectedOutfit}</h3>
              <img
                src={selectedOutfit === 'casual' ? '/assets/casual_shirt.jpg' : '/assets/formal_suit.jpg'}
                alt={selectedOutfit}
                className="w-full h-48 object-cover rounded-lg mt-4 shadow-md"
              />
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Recommendations</h2>
          {aiRecommendations.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {aiRecommendations.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-transform">
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg mt-2 shadow-md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No recommendations yet. Select an outfit to get suggestions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;




