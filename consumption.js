var sum = 0.0;
var date_n = new Date();
var currentTime = date_n;
var currentDay = currentTime.getDay();
var wednesday = 3;
var daysBack, pastDate;
if(currentDay > wednesday){
	daysBack = currentDay - wednesday;
}
else{
	daysBack = (7 - wednesday) + currentDay;
}

last_wednesday = new Date(date_n.getFullYear(),date_n.getMonth(), date_n.getDate() - daysBack);
	console.log(last_wednesday);
for (i = 18; i < document.getElementsByTagName('tr').length - 4; i++){

	d = parseFloat(document.getElementsByTagName('tr')[i].childNodes[6].innerHTML.split(' ')[0]);

	date = new Date(document.getElementsByTagName('tr')[i].childNodes[3].innerHTML + ", 2015");



	if(date > last_wednesday){	
		sum += d;
	}

}
alert("downloaded = " + sum);