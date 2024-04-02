

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


export default haversineDistance;