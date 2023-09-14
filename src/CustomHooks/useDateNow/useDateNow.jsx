const useDateNow = () => {
    const date = new Date(); 
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const dateFormatter = new Intl.DateTimeFormat("en-GB", options);
    const dateNow = dateFormatter.format(date);
   // console.log(dateNow);
    return {dateNow};
};
export default useDateNow;

