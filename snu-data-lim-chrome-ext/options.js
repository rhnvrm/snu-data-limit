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
  var username = document.getElementById('uname').value;

  chrome.storage.sync.set({
    userID: uid,
    userName: username
  }, 
  function() {
    update_status('Options saved.')
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    userID: '00000',
    userName: 'pq123'
  }, function(items) {
    document.getElementById('uid').value = items.userID;
    document.getElementById('uname').value = items.userName;
  });
}

function logout() {
  save_options();
  chrome.storage.sync.get({userName: '00000'}, function(items){
    var user = items.userName;
    chrome.runtime.sendMessage(
      {from: "options", action: "sendLogoutRequest", username: user},
      update_status("Sent Logout Request.")
    );
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('logout').addEventListener('click',
    logout);

