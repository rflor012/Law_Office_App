
$(".the-contract-button").click(function(){
const newContract = {};

newContract.theCaseID = $("#theCaseID").val();
newContract.theContract = $("#theContractText").text();

  axios.post('/payments/updatedContract', newContract)
  .then(blah=>{
    window.location.replace('/client/all');
  });
});
// Thank you Nick for the help here, made an axios call in order to obtain all of the text from the contract Page
// we constructed an object here as well by declaring the variable new Contract, then reference the Routes to see whats going on there
//window.location.replace is the way to redirect using vanilla JS HOW NIFTY HUH
