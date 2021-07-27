let btnSubmit=document.getElementById("submit");
let txtTicketOutput=document.getElementById("ticketOutput");
let txtPriceOutput=document.getElementById("priceOutput");
let btnAddCart=document.getElementById("addCart");
let tickForm=document.getElementById("ticketForm");
let txtOverall=document.getElementById("overallItems");
let btnPlaceOrder=document.getElementById("placeOrder");
let btnAddtoFav=document.getElementById("fav");
let btnOrderFav=document.getElementById("orderFav");
let OverallTotal=document.getElementById("overallTotal");
let btnChkLoyalty=document.getElementById("loyalty");
let txtItemOutput=document.getElementById("itemOutput");
let overallNumber=document.getElementById("overallNumber");
let btnDonate=document.getElementById("donate");

btnDonate.addEventListener("click",donate);
btnSubmit.addEventListener("click",submit);
btnAddCart.addEventListener("click",addToCart);
btnPlaceOrder.addEventListener("click",placeOrder);
btnAddtoFav.addEventListener("click",favourite);
btnOrderFav.addEventListener("click",OrderFav);
btnChkLoyalty.addEventListener("click",showLoyaltyPoints);

let arr=[];
let priceArr=[];
let overallArr=[];
let orderFavArr=[];
let loyalArr=[];


loyalArr[0]={
    "points": 0
  };
  localStorage.setItem('loyalArr',JSON.stringify(loyalArr));

function submit(){
   
    let total=0,totalItems=0;
   
    let ticketType=document.querySelector("input[name='ticketType']:checked").value;
    let duration=document.querySelector("input[name='duration']:checked").value;
    let numberOfTickets=document.getElementById("numOfTickets").value;
    let extras=document.getElementsByName("extras");
    let numOfAnnual=document.getElementById("numOfAnnualPasses").value;
    let numOfFood=document.getElementById("numOfFood").value;
    let extr="";
    for(let i=0;i<extras.length;i++){
        if(extras[i].checked==true){
            if(extras[0].checked==true){extr+=extras[0].value+" x "+numOfAnnual};
            if(extras[1].checked==true){extr+=extras[1].value+" x "+numOfFood};
            if(extras[2].checked==true){extr+=extras[2].value};
            if(extras[0].checked==true && extras[1].checked==true){extr=extras[0].value+" x "+numOfAnnual+"  "+extras[1].value+" x "+numOfFood};
           
        };
    }


    
    txtTicketOutput.innerText=ticketType+" "+duration+" x "+numberOfTickets+"  Extras : "+extr;
    
    
    let ticket=document.querySelector("input[name='ticketType']:checked").nextElementSibling.innerHTML;
    let dur=document.querySelector("input[name='duration']:checked").nextElementSibling.innerHTML;

    let ticketSplit=ticket.split(".");
    let durSplit=dur.split(".");

    let price=parseInt(ticketSplit[1]);
    let durPrice=parseInt(durSplit[1]);
   
   let extraPrice=0;
   if(extras[0].checked==true){extraPrice=5000*numOfAnnual};
   if(extras[1].checked==true){extraPrice=500*numOfFood};
   if(extras[2].checked==true){extraPrice=0};
   if(extras[0].checked==true && extras[1].checked==true){extraPrice=(5000*numOfAnnual)+(500*numOfFood)}  
    

    total=(price+durPrice)*numberOfTickets+extraPrice;
    totalItems=parseInt(numberOfTickets)+parseInt(numOfAnnual)+parseInt(numOfFood);
    
    txtItemOutput.innerText="Number of Items :"+totalItems;
    txtPriceOutput.innerText="Total           : Rs. "+total;
    tickForm.reset();
  
}

function addToCart(){
 
    let items=txtTicketOutput.innerHTML;
    let price=txtPriceOutput.innerHTML;
    let overallRow=items+"           "+price;

    overallTotal();
    loyaltyPoints(); 

    txtOverall.innerText+="\n"+overallRow+"\n";
    txtTicketOutput.innerHTML="";
    txtItemOutput.innerHTML="";
    txtPriceOutput.innerHTML="";
   
    
}

function placeOrder(){
    alert('Thank you for your reservation!');
    window.location = 'https://kevinddenny.github.io/WDOSassignment/Donate.html';
}

function favourite(){
    
    const entry={
        "item":txtOverall.innerText,
        "itemNum":overallNumber.innerText,
        "price":OverallTotal.innerText,
    };
    arr=(entry);
    localStorage.setItem('arr',JSON.stringify(arr));

    
}
let total=0,totPrice,totalFav=0,favItemNum=0;
function OrderFav(){
    arr=JSON.parse(localStorage.getItem('arr'));
        for(let i=0;i<1;i++){
            txtOverall.innerText+=arr.item;
            favItemNum=arr.itemNum;
            totPrice=arr.price;
            
        }
        let totPriceSplit=totPrice.split(".");
        let totPriceParse=parseInt(totPriceSplit[1]);
 
        let numItemsSplit=favItemNum.split(":");
        let numItemsParse=parseInt(numItemsSplit[1]);
        
       
        let overallFavSplit=(OverallTotal.innerText).split(".");
        totalFav=parseInt(overallFavSplit[1]);
        
        let overallFavItemSplit=(overallNumber.innerText).split(":");
        favItemNum=parseInt(overallFavItemSplit[1]);
        
        
        OverallTotal.innerText="Overall Total : Rs."+(totPriceParse+totalFav);
        overallNumber.innerText="Overall Number  Items :"+(numItemsParse+favItemNum);
       
        loyaltyPoints();

        
}

let totalPrice=0,totalItemNum=0,loyaltyPoint=0;;



function overallTotal(){
 
    let price=txtPriceOutput.innerHTML;
    let numItems=(txtItemOutput.innerHTML).split(":");
 
    let overallPrice=price.split(".");
    let overallTotal=parseInt(overallPrice[1]);
    let overallItemNum=parseInt(numItems[1]);
    

        totalPrice=overallTotal;
        totalItemNum=overallItemNum;
        
 
   
    let overallFavSplit=(OverallTotal.innerText).split(".");
    totalFav=parseInt(overallFavSplit[1]);
    let overallFavItemSplit=(overallNumber.innerText).split(":");
    favItemNum=parseInt(overallFavItemSplit[1]);
    
     
    overallNumber.innerText="Overall Number of Items :"+(totalItemNum+favItemNum);
        
    OverallTotal.innerText="Overall Total : Rs."+(totalPrice+totalFav);

  
}

function loyaltyPoints(){
    let itemNum=(overallNumber.innerText).split(":");

    let compare=parseInt(itemNum[1]);
    loyalArr=JSON.parse(localStorage.getItem('loyalArr'));
    if(compare>3){
        if(loyalArr.length==0){
            loyaltyPoint=0;
        }
       else{loyaltyPoint=20*compare;}
    }
    if(compare<=3){
        
       
            for(let i=0;i<loyalArr.length;i++){
                loyaltyPoint=loyalArr[loyalArr.length-1].points;
                
            }
        
    }

    const loyalty={
        "points":loyaltyPoint,
    };
    loyalArr.push(loyalty);
    localStorage.setItem('loyalArr',JSON.stringify(loyalArr));

}

function showLoyaltyPoints(){
    loyalArr=JSON.parse(localStorage.getItem('loyalArr'));
        for(let i=0;i<loyalArr.length;i++){
            loyaltyPoint=loyalArr[i].points;
            
        }

    console.log(loyaltyPoint);
    alert('You currently have '+loyaltyPoint+" points!")
}

function donate(){

    alert('Thank you for your donation!');
    window.location = 'https://kevinddenny.github.io/WDOSassignment/Donate.html';
}