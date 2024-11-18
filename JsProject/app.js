const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");






for(let select of dropdowns){
    for(let currcode in countryList){
      let newOpt = document.createElement("option");
      newOpt.innerText = currcode;
      newOpt.value = currcode;
      if(select.name === "from" && currcode === "USD"){
        newOpt.selected = true;
      }
      else if(select.name === "to" && currcode === "INR"){
        newOpt.selected = true;
      }
      select.append(newOpt);  
    }

    select.addEventListener( "change", (eve) => {
      updateFlag(eve.target)
    })
}

const updateFlag = (element) => {
 let currcode = element.value;
 let countryCode = countryList[currcode];
 let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
}

 const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal<0){
     amtVal = 1;
     amount.value = 1;
  }
 
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
 
  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
 }

btn.addEventListener("click",  (evt) => {
  evt.preventDefault();
  updateExchangeRate();
 

})

window.addEventListener("load", ()=>{
  updateExchangeRate();
})