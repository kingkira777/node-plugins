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

ReadExcelFileCoor();






