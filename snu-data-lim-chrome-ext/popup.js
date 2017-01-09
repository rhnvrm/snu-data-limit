function update_status(status_message){
  var status = document.getElementById('status');
  status.textContent = status_message;
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

function logout() {
  chrome.storage.sync.get({userName: '00000'}, function(items){
    var user = items.userName;
    chrome.runtime.sendMessage(
      {from: "options", action: "sendLogoutRequest", username: user},
      update_status("Sent Logout Request.")
    );
  });
}

function build_graph_from_data(data){
  var data_percent = data.data_used_in_percent;
  $("#graph").data("easyPieChart").update(data_percent);
}

function build_table_from_data(data){
  var data_used = data.data_used;
  var data_percent = data.data_used_in_percent;
  var last_updated = data.last_updated;

  var template = 
  `
  <style type="text/css">
  .tg  {border-collapse:collapse;border-spacing:0;border:none;margin:0px auto;}
  .tg td{font-size:11px; 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;}
  .tg th{font-size:11px;font-weight:normal; 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;}
  .tg .tg-s6z2{text-align:center}
  .tg .tg-34fq{font-weight:bold;text-align:right}
  @media screen and (max-width: 767px) {.tg {width: auto !important;}.tg col {width: auto !important;}.tg-wrap {overflow-x: auto;-webkit-overflow-scrolling: touch;margin: auto 0px;}}</style>
  <div class="tg-wrap"><table class="tg">
    <tr>
      <td class="tg-34fq">Data Used</th>
      <td class="tg-s6z2">${data_used} MB</th>
    </tr>
    <tr>
      <td class="tg-34fq">Percentage Used</td>
      <td class="tg-s6z2">${data_percent}%</td>
    </tr>
    <tr>
      <td class="tg-34fq">Last Updated</td>
      <td class="tg-s6z2">${last_updated}</td>
    </tr>
  </table></div>
  `;
  return template;
}

window.onload = function() {
  $("#graph").easyPieChart({ 
    animate: 1000,
    size: 110,
    onStep: function (from, to, percent) {
      $("#pcent").text(Math.round(percent));
    }
  });

  chrome.storage.sync.get({
    userID: '00000',
    userName: 'pq123'
  }, function(items) {
    if(items.userID == '00000' || items.userName === 'pq123') {
      document.getElementById("data").innerHTML = "Welcome! <br>Please set your UserID and UserName in our extension's <a target='_blank' href='options.html'>options page</a>.";
    }
    else {
      chrome.runtime.sendMessage(
        {from: "popup", action: "getData"},
        update_status("success")
      );
      chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
        if(message.from && message.from === "bg"){
          switch(message.action){
            case "updateData":
              build_graph_from_data(message.value);
              document.getElementById("data").innerHTML =  build_table_from_data(message.value);
              sendResponse("globalres")
              break;
          }
        }
      });
    }
  });

  document.getElementById('logout').addEventListener('click',logout);
  document.getElementById('options').addEventListener('click',function(){window.open("options.html")});
}

