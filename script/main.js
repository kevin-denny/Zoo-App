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
let btnDonate=document.getElementById("donate");

btnDonate.addEventListener("click",donate);
btnSubmit.addEventListener("click",submit);
btnAddCart.addEventListener("click",addToCart);
btnPlaceOrder.addEventListener("click",placeOrder);
btnAddtoFav.addEventListener("click",favourite);
btnOrderFav.addEventListener("click",OrderFav);

let arr=[];
let priceArr=[];
let overallArr=[];
let orderFavArr=[];




function submit(){
   
    let total=0;
   
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


    
    txtTicketOutput.innerText+=ticketType+" "+duration+" x "+numberOfTickets+"  Extras : "+extr;
    
    
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
     
   
    txtPriceOutput.innerText="Total : Rs. "+total;
  
  
}

function addToCart(){
 
    let items=txtTicketOutput.innerHTML;
    let price=txtPriceOutput.innerHTML;
    let overallRow=items+"           "+price;

    overallTotal();

    txtOverall.innerText+="\n"+overallRow+"\n";
    txtTicketOutput.innerHTML="";
    txtPriceOutput.innerHTML="";
   
    
}

function placeOrder(){
    alert('Thank you for your reservation!');

    txtOverall.innerText="";
    OverallTotal.innerText="";
}

function favourite(){
    localStorage.clear();
    const entry={
        "item":txtOverall.innerText,
        "price":OverallTotal.innerText,
    };
    arr=(entry);
    localStorage.setItem('arr',JSON.stringify(arr));
   
}
let total=0,totPrice,totalFav=0;
function OrderFav(){
    arr=JSON.parse(localStorage.getItem('arr'));
        for(let i=0;i<1;i++){
            txtOverall.innerText+=arr.item;
            totPrice=arr.price;
            
        }
        let A=totPrice.split(".");
        let B=parseInt(A[1]);
 
        
       
      let overallFavSplit=(OverallTotal.innerText).split(".");
       
       
     
      totalFav=parseInt(overallFavSplit[1]);
        
        
 
    OverallTotal.innerText="Overall Total : Rs."+(B+totalFav);

       
        

        
}

let totalPrice=0;



function overallTotal(){
 
    let price=txtPriceOutput.innerHTML;
 
    let overallPrice=price.split(".");
    let overallTotal=parseInt(overallPrice[1]);
    

        totalPrice=overallTotal;
        
        
 
   
    let overallFavSplit=(OverallTotal.innerText).split(".");
       
       
     
    totalFav=parseInt(overallFavSplit[1]);
       
       
        
       OverallTotal.innerText="Overall Total : Rs."+(totalPrice+totalFav);
    
  


}
function donate(){
  
   
    console.log("Handle");
    alert('Thank you for your donation!');
    window.location = 'https://kevinddenny.github.io/WDOSassignment/Donate.html';
}