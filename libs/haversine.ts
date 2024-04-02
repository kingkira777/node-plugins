import ExcelJS from 'exceljs';


const filePath = 'files/BranchListLongLat.xlsx'



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





const haversineDistance = (coords1: any, coords2:any, isMiles:boolean = false) => {
    
    //CALCULATE THE RADIUS OF A NUMBER
    function toRad(x:number) {
        return x * Math.PI / 180;
    }
    
    //ORIGIN LOCATION=============
    var lon1 = coords1[0];
    var lat1 = coords1[1];
    
    //DESTINATION LOCATION========
    var lon2 = coords2[0];
    var lat2 = coords2[1];
    

    var R = 6371; // RADIUS OF EARTH IN KM
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);

    //APPLY THE HARVERSINE FORMULA=========================
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    
    //Conversion metric
    if(isMiles) d /= 1.60934;
    return d;
};


export default ReadExcelFileCoor;