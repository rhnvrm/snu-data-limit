// Update Status

function update_status(status_message){
  var status = document.getElementById('status');
  status.textContent = status_message;
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

// Saves options to chrome.storage.sync.
function save_options() {
  var uid = document.getElementById('uid').value.slice(-5);

  chrome.storage.sync.set({
    userID: uid,
  }, 
  function() {
    update_status('Options saved.')
  });
}

function restore_options() {
  chrome.storage.sync.get({
    userID: '00000',
  }, function(items) {
    document.getElementById('uid').value = items.userID;
  });
}

function logout() {
  save_options();
  chrome.runtime.sendMessage(
    {from: "options", action: "sendLogoutRequest"},
    update_status("Sent Logout Request.")
  );  
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('logout').addEventListener('click',
    logout);

