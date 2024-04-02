import moment from "moment";

//https://momentjs.com/

const dateNow = moment().format("YYYY-MM-DD hh:mm:ss");

const MomentDateTimeFormat = () => {

    //FORMAT
    const m1 = moment(dateNow).format('MMMM Do YYYY, h:mm:ss a');
    console.log(m1);

    //ADD
    const m2 = moment(dateNow).add(10, "days").format('YYYY-MM-DD');
    console.log(m2);

    //Subtract
    const m3 = moment(dateNow).subtract(10, 'days').format('YYYY-MM-DD');
    console.log(m3);
};



export default MomentDateTimeFormat;

