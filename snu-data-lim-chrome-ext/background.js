var globalres;

function calcConsumption(input){
	//console.log(input);

	var sum = 0.0;
	var date_n = new Date();
	var currentTime = date_n;
	var currentDay = currentTime.getDay();
	var wednesday = 3;
	var daysBack, pastDate;
	if(currentDay >= wednesday){
		daysBack = currentDay - wednesday;
	}
	else{
		daysBack = (7 - wednesday) + currentDay;
	}

	last_wednesday = new Date(date_n.getFullYear(),date_n.getMonth(), date_n.getDate() - daysBack);
		//console.log(last_wednesday);
	

	for (i in input){

		var x = input[i];

		date = new Date(x.stoptime + ", 2015");
		//console.log(date);
		d = parseFloat(x.download.split(' ')[0]);
		data_size= x.download.split(' ')[1];
		if(data_size == "KB") d/=1024;
		else if(data_size == "GB") d*=1024;

		if(date > last_wednesday){	
			sum += d;
		}

	}


	response = "Data Downloaded: " + sum + " MB" + "<br>" + "Percentage Data: " + sum/30 + "%";
	console.log(response);
	
  chrome.runtime.sendMessage(
    {from: "bg", action: "updateData", value: response}
  );
}
function ajaxReq() {
  //your code here
	//alert("welcome!");


	$.ajax({
	  url: 'http://192.168.50.1/24online/servlet/AjaxManager',
	  type: 'GET',
	  data: 'mode=740&ran=0.5069594494998455&selectedyear=2015&userid=20975',
	  success: function(data) {
		//called when successful
		calcConsumption(data);
	  },
	  error: function(e) {
		//called when there is an error
		console.log(e.message);
	  }
	});


}

chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.from && message.from === "popup"){
    switch(message.action){
      case "doAjaxReq":
        /* Do something */
        ajaxReq();
        /* Maybe sendResponse(something) */
        sendResponse(globalres)
        break;
    }
  }
});

//http://192.168.50.1/24online/servlet/AjaxManager?mode=740&ran=0.5069594494998455&selectedyear=2015&userid=20975