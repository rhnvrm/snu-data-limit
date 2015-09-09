function doSomethingAfterwards(response){
  /* Do something else */
  //alert(response);
}

window.onload = function() {

  chrome.runtime.sendMessage(
    {from: "popup", action: "doAjaxReq"},
    doSomethingAfterwards
  );

  chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.from && message.from === "bg"){
    switch(message.action){
      case "updateData":
        /* Do something */
        document.getElementById("data").innerHTML = message.value;
        var test = message.value;
        /* Maybe sendResponse(something) */
        sendResponse("globalres")
        break;
    }
  }
});

}