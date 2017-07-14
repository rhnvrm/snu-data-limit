var globalres;

function calcConsumption(input){
	
	input = input.sort(function(a, b){return new Date(b.stoptime) - new Date(a.stoptime)})

	var sum = 0.0;
	var date_n = new Date();
	var currentTime = date_n;
	var currentDay = currentTime.getDay();
	var wednesday = 3;
	var daysBack, pastDate;
	var currentYear  = (new Date()).getYear() -100 +2000;
	if(currentDay >= wednesday){
		daysBack = currentDay - wednesday;
	}
	else{
		daysBack = (7 - wednesday) + currentDay;
	}

	last_wednesday = new Date(date_n.getFullYear(),date_n.getMonth(), date_n.getDate() - daysBack);
		
	var last_updated;

	for (i in input){

		var x = input[i];

		date = new Date(x.stoptime + ", " + currentYear);

		d = parseFloat(x.download.split(' ')[0])/(1024*1024);
		
		if(date > last_wednesday){	
			sum += d;
		}
	}
	if(input.length){
		last_updated = input[0].stoptime;
	}
	else{
		last_updated = 'empty response recd, try again later!';
	}

	response = {
		data_used: sum.toFixed(3),
		data_used_in_percent: (sum/30).toFixed(3),
		last_updated: last_updated
	}

  chrome.runtime.sendMessage(
    {from: "bg", action: "updateData", value: response}
  );
}

function requestData() {
	var currentMonth = (new Date()).getMonth();
	var previousMonth = (new Date()).getMonth() - 1;
	var currentYear  = (new Date()).getYear() - 100 + 2000;
	uid='00000';
	chrome.storage.sync.get({
	    userID: '00000'
	  }, function(items) {
	    uid = items.userID;
	    $.ajax({
		  url: 'http://192.168.50.1/24online/servlet/AjaxManager',
		  type: 'GET',
		  data: 'mode=740&selectedyear='+currentYear+'&selectedmonth='+currentMonth+'&userid='+uid,
		  success: function(data1) {
				$.ajax({
			 	  url: 'http://192.168.50.1/24online/servlet/AjaxManager',
				  type: 'GET',
				  data: 'mode=740&selectedyear='+currentYear+'&selectedmonth='+ previousMonth +'&userid='+uid,
				  success: function(data2) {
						calcConsumption(data1.concat(data2));
				  },
				  error: function(e) {
						console.log(e.message);
				  }
			});


		  },
		  error: function(e) {
				console.log(e.message);
		  }
		});
	  });
}

function sendLogoutRequest() {

  var user;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var re = new RegExp('.....@snu.in');
		   	var user_name = re.exec(xhttp.responseText);
	      user = user_name[0];

	      var data = "mode=193&isAccessDenied=null&url=null&message=&checkClose=1&sessionTimeout=0&guestmsgreq=true&logintype=1&orgSessionTimeout=0&chrome=-1&alerttime=null&timeout=0&popupalert=0&dtold=0&mac=&servername=192.168.50.1&profilegroupid=1&profileName=SNU&username="+user+"&usernameTyped=&password=&saveinfo=&loginotp=false&logincaptcha=false®isteruserotp=false®istercaptcha=false";

	      var xhr = new XMLHttpRequest();
	      xhr.withCredentials = true;

	      xhr.addEventListener("readystatechange", function () {
	        if (this.readyState === 4) {
	          console.log("Attemting Logout!");
	          chrome.runtime.sendMessage(
	            {from: "bg", action: "updateData", value: response}
	          );
	        }
	      });

	      xhr.open("POST", "http://192.168.50.1/24online/servlet/E24onlineHTTPClient");
	      xhr.setRequestHeader("pragma", "no-cache");
	      xhr.setRequestHeader("origin", "null");
	      xhr.setRequestHeader("accept-encoding", "gzip, deflate");
	      xhr.setRequestHeader("accept-language", "en-US,en;q=0.8");
	      xhr.setRequestHeader("upgrade-insecure-requests", "1");
	      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	      xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
	      xhr.setRequestHeader("cache-control", "no-cache");
	      xhr.setRequestHeader("connection", "keep-alive");
	      xhr.send(data);
	    }
	};
	xhttp.open("GET", "http://192.168.50.1/24online/webpages/client.jsp", true);
	xhttp.send();

  

}

chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.from && message.from === "popup"){
    switch(message.action){
      case "getData":
        /* Do something */
        requestData();
        /* Maybe sendResponse(something) */
        sendResponse(globalres)
        break;
    }
  }
  if(message.action === "sendLogoutRequest"){
  	sendLogoutRequest(message.username);
  	sendResponse("Attempting.")
  }
});