import TestData from "../libs/brainJS";
import WebScrapping from "../libs/webScrapping";
import haversineDistance from "../libs/haversine";
import ExcelJS from 'exceljs';


const filePath = './files/BranchListLongLat.xlsx'

//COORDINATE ORIGIN;
const coordinates1 = [
    121.13990268062997,14.565096883222994  //SM TAYTAY
]


const ReadExcelFileCoor = async() => {
    const resutlDistances:any =[];

    const workbook = new ExcelJS.Workbook();
    const results = await workbook.xlsx.readFile(filePath);
    const worksheet = results.getWorksheet("Sheet1");
    worksheet?.eachRow({ includeEmpty: true }, function(row:any, rowNumber) {
        const branchCode = row.values[1];
        const branchName = row.values[2];
        const branchAddress = row.values[3];
        const longitude = row.values[4];
        const latitude = row.values[5];
        const coordinate2 = [latitude, longitude];
        const distance = haversineDistance(coordinates1,coordinate2);
        if(!isNaN(distance)){
            const branchData= {
                branchCode : branchCode,
                name : branchName,
                distance : distance,
            }   
            resutlDistances.push(branchData);
        }

    });
    var items = Object.keys(resutlDistances).map((key:any)=>{
        return [key, resutlDistances[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return first[1].distance - second[1].distance;
    });
    console.log(items.slice(0, 5));
}

//ReadExcelFileCoor();
WebScrapping();





// const coordinates2 = [
//     {   
//         name : 'Tikling',
//         long : 14.577920662387804,
//         lat :  121.14257432517694
//     }, //Tikling  -0.8002527409450942
//     {
//         name : 'Kalayaan',
//         long : 14.56754144515581,
//         lat : 121.13076900130642
//     },//Kalayaan - 1.4018851744256826
//     {
//         name : 'Kichen Cafe',
//         long : 14.565723818648484,
//         lat : 121.13207733615404
//     },
//     {
//         name : 'Sam Taytay',
//         long : 14.559864428333169,
//         lat : 121.13666072478294
//     },
//     {
//         name : 'Memorial Park',
//         long :14.563768884832983,
//         lat : 121.14071622468065
//     },
//     {
//         name : 'Toyota Taytay',
//         long : 14.574867418907871, 
//         lat : 121.14402334679207
//     },
//     {
//         name : 'SM Megamall',
//         long : 14.587950339614228,
//         lat : 121.05591814445236
//     }
// ]

// const resutlDistances =[];

// for(var i in coordinates2) {
//     const coor2 = [coordinates2[i].lat,coordinates2[i].long];
//     const distance = haversineDistance(coordinates1, coor2);
//     resutlDistances.push(distance);
//     console.log(coordinates2[i].name +": "+ distance+" km")
// }

// console.log(resutlDistances.sort());





