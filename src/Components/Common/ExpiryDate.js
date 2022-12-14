
const packageExpiryDate = () => {
const end_date = localStorage.getItem("end_date");

  //to calculate expiry date
  const todayDate = new Date();
  const expiryDate = new Date(end_date);
  let oneDay = 24*60*60*1000;
  let diffDays = Math.ceil((expiryDate.getTime() - todayDate.getTime()) / (oneDay));

 return diffDays;
}

export default packageExpiryDate;