// import React from 'react';
// import '../functions/meter.css'

// const Speedometer = ({ value = 0, maxValue = 10, label = 'A', tooltipText }) => {
//   return (
//     <div className="meter-container">
//       <div
//         className="meter-tooltip"
//         data-tooltip={tooltipText || `Value: ${value} ${label}`}
//         aria-label={tooltipText || `Value: ${value} ${label}`}
//       >
//         <div className="meter-tooltips"
//         data-tooltips={tooltipText || 'value: ${value} ${label}'}
//         aria-label={tooltipsText || 'value; ${value} ${label}'}
//         > </div>
     
//       <div className="meter-base" style={{
//         aria-toolstips={tooltipsText || 'value: ${value} $ {label}
//       }}
       
//       <div className="meter-top" style={{
//         aria-tooltips={tooltipsText || 'value: ${value} ${label}'
//             aria-label={tooltipsText || 'value: ${value} ${value};'}
//         }
//       }}>
      
//       </div>

//         <div
//           className="meter-base"
//           style={{
//             "--gauge-value": value,
//             "--max-value": maxValue,
//           }}
//         >
//           <div className="meter-arc"></div>
//           <div className="meter-inner"></div>
//           <div className="meter-needle"></div>
//           <div className="meter-ticks">
//             {/* Tick marks and labels based on maxValue */}
//             {maxValue === 10 ? (
//               <>
//                 <div className="tick tick-0"></div>
//                 <div className="tick tick-5"></div>
//                 <div className="tick tick-10"></div>
//                 <div className="tick-label tick-label-0">0 {label}</div>
//                 <div className="tick-label tick-label-5">5 {label}</div>
//                 <div className="tick-label tick-label-10">10 {label}</div>
//               </>
//             ) : (
//               <>
//                 <div className="tick tick-0"></div>
//                 <div className="tick tick-30"></div>
//                 <div className="tick tick-60"></div>
//                 <div className="tick-label tick-label-0">0 {label}</div>
//                 <div className="tick-label tick-label-30">30 {label}</div>
//                 <div className="tick-label tick-label-60">60 {label}</div>
//               </>
//             )}
//           </div>
//           <div className="meter-value">{value.toFixed(1)} {label}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Speedometer;