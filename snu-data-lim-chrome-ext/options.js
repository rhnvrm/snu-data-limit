// Saves options to chrome.storage.sync.
function save_options() {
  var uid = document.getElementById('uid').value.slice(-5);

  chrome.storage.sync.set({
    userID: uid
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    userID: '00000'
  }, function(items) {
    document.getElementById('uid').value = items.userID;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);