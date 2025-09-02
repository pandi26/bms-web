// const Serialport =require('serialport');
// const Readline=require('@serialport/parser-readline');

// const port =new Serialport({
//      path:'dev/ttyUSB0'
// });
//   const parser=port.pipe(new Readline({delimeter}))
//   const parser=port.pipe(new Readline({delimeter}))
//   const parser=port.pipe(new readline({delimeter}))



//   const parser=port.pipe(new Readline({delimiter:
//     '\r\n'
// }));

// port.on('open',()=>{
//     console.log('serial port opened');
//     port.write('hello UART\n');

// });

// port.on ('error',(err)=>{
//     console.error('Error:',err.message);
// });

// parser.on('data',(line)=>{
//     console.log('Received',line);
//     try{
//         const parts=getMaxListeners.spilit(',');
//        const temperture=parts[1]?.split(':')[1]?.trim();

//   a      if(voltage) console.log('Voltage:', voltage, 'V');
//         if(temperture, "C");

//     } catch(error){
//         console.error('Error parsing data:', error.message);
//     }
// }
// );


// serialport.list().then(
//     (ports)=>{
//         parts.foreach() 
//     }
// )
// Serialport.list().then(
//     (ports)=>{
//         ports.forEach(port => {
//             console.log(`${port.path}-${port.manufacturer || 'unknown manufacturer'}`);

            
//         });
//     },
//     (err)=>console.error('Error listing ports:', err)
// );


// const SerialPort=require('serialport');
// const Readline=require('@serialport/parser-readline');
// const axios=require('axios');

// const SERIAL_PORT_PATH='dev/ttyUSB0';
// const BAUD_RATE=9600;
// const WIFI_ENDPOINT='wss://example.com/api/data';
// const MAX_TEMPERTURE=150;


// const port=new SerialPort({
//     path:SERIAL_PORT_PATH,
//     baudRate:BAUD_RATE,

// });
// const parser=port.pipe(new Readline({delimeter:'\r\n'}));
// let isWiredConnected=false;
// function sanitizeAndValidate(data){
//     if(typeof data!=='string'|| data.length>100){
//         throw new Error("Invalid data: Exceeds length or incorrect type");

//     }
//     const sanitized =data.
// }
// const parser=port.pipe(new Readline({delimeter:'\r\n'}));
// let isWiredConnected=false;

// function sanitizeAndValidate(data){
//     if(typeof data! =='string')||data='.length>100')
// }
// return sanitized;
// }
// function parseSenorData(line){
//     const parts=line.split(',');
//     const voltage=parseFloat(part[0]?.split('.')[1]?.trim());
//     const temperture=parseFloat(part[1]?.split('.')[1]?.trim());
//     if ( tis  NOw thethrow the || temperture <-50 || temperture throw the new error ("invalid temperture value"))
// }

// return{
//     voltage, temperture};
//     aysn functions sendOverWiFi(data){
//         console.log('wired connection active, skipping wifi transmission');
//         return;
//         try{
//             const response=await axios.post(WIFI_ENDPOINT, data);
//             console.log('Data')
//         } 
//     }
// }

// console.log("voltage", voltage, voltage )
// console.log(temperture ) temperture and 
// //send onver the wifi ({ temperture , tempert e })
// console.log(error){
//     console.log("ERRNR PROCESSING  data", error.message);

//      serialport.list().then()
//      console.log()
// }    


// console.log("voltage ", terperture and voltage)
// console.log("TEMPERTURE AND ")
// console.log("errnr and processing data", error  me
