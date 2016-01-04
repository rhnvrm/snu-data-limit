# snu-data-limit
A small script and a Chrome Extension that calculates the data you have downloaded since the last wednesday for Shiv Nadar University

<a target="_blank" href="https://chrome.google.com/webstore/detail/snudatalimit/mfjinloagcpmfacpjnlabcflnkbajidd">![Try it now in CWS](https://raw.github.com/GoogleChrome/chrome-app-samples/master/tryitnowbutton.png "Click here to install this sample from the Chrome Web Store")</a>


# Using the Chrome Extension v2
1. Download the .crx file given in the repo from here: https://github.com/rhnvrm/snu-data-limit/raw/master/snu-data-lim-chrome-ext.crx
2. Install the chrome extension.
3. Login at http://192.168.50.1/24online/webpages/myaccountlogin.jsp using your SNU ID in the following format for user name: pq123@snu.in 
4. Goto http://192.168.50.1/24online/webpages/myaccount/accountstatus.jsp
5. Copy the last five digits your Account No.
3. Paste the copied UserID in the Chrome Extension's Options page (accessible from chrome://extensions/).
4. Click on the Extensions View Popup button in your menu bar.

## Note: See issue #4 if you are on Windows

# Using the console
1. Open http://192.168.50.1/24online/webpages/myaccount/usagedetail.jsp
2. Open the console (ctrl + shift + j)
3. Paste code from consumption.js and press enter



# Using the bookmarklet
1. Add a bookmark with url as the code from bookmarklet.js
2. Click on the bookmark on the page http://192.168.50.1/24online/webpages/myaccount/usagedetail.jsp
3. Or you can directly paste the bookmarklet.js code into your URL bar. (Make sure it begins with 'javascript:' when you paste)

## Notes
1. Make sure you change the displayed entries from 10 to 200.
