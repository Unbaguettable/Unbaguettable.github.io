/* 
- Most common message / word
- Average time of messages / day
- Ability to view the chat
*/

// Get the file input element and the element where we'll display the file contents
const fileInput = document.getElementById('fileInput');
const resultsContent = document.getElementById('results');
document.addEventListener('dragover', (event) => {
  event.preventDefault();
});
let zipContents;
let messages = {};
let allNames = []
let buttonCount = 0
const dateTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2}):(\d{2})$/;
const messageRegex = /^(.*?)(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\] (.+?): (.+)/;

// ---- IMAGES ----

const replaceAttachmentLinks = async (text) => {
    const attachmentRegex = /<attached: ([^>]+)>/g;
    let match;
    while ((match = attachmentRegex.exec(text)) !== null) {
      const filename = match[1];
      buttonText = `<button onclick="displayImage('${filename}')" id='${filename}'>View Image</button>`;
      text = text.replace(match[0], buttonText);

      // <button src="displayImage('image.jpg')">View Image</button>
    }
    return text;
  };

const displayImage = (filename) => {
  // construct the URL to the image file in the zip archive
  const imageUrl = zipContents.file(filename);

  // read the image data as a base64-encoded string
  imageUrl.async("base64").then((imageData) => {
    // create a new image element with the base64-encoded image data
    const img = document.createElement("img");
    img.src = `data:image/jpeg;base64,${imageData}`;

    // replace the button with the image element
    const button = document.getElementById(filename);
    button.outerHTML = "<br><img src='" + img.src + "' style='max-width: 300px; max-height: 300px;' />";
  });
};

const convertTime = function(date, time) {
  dateString = date + " " + time
  d = dateString.match(dateTimeRegex)
  return time = new Date(d[3], d[2]-1, d[1], d[4], d[5], d[6]).valueOf()
}

// ---- MESSAGES ----

const saveMessages = (text) => {
   localMessages = []
   text.split("\r\n").forEach((line) => {
        match = messageRegex.exec(line)
        if (match) {
        // 2: Date 3: Time 4: Name 5: Message
        localMessages.push([match[2], match[3], match[4], match[5]])
        if (!allNames.includes(match[4])) {
            allNames.push(match[4])
        }
    }
    });
   sendingTo = localMessages[0][2]
   localMessages.shift()
   messages[sendingTo] = localMessages  
   console.log("Loading Data for " + sendingTo)
  //const [messageCount, specialString, times, emojis, emojiCount, mostUsedEmoji] = newAnalyse(sendingTo);
  updateTabs(newAnalyse(sendingTo))
}

    /* Possible things to look at:
    - time / date
    - most popular words
    - get conversation with most messages
    - search chat
    - most used emoji list
    */

const newAnalyse = function(sendingTo){
  messageCount = {}
  specialString = {"image":0,"video":0,"sticker":0,"gif":0,"YouDeleted":0,"TheyDeleted":0}
  times = {"1d":0,"7d":0,"30d":0,"90d":0,"180d":0,"365d":0}
  currentTime = new Date().valueOf()
  const emojiRegex = /\p{Emoji_Presentation}/gu
  emojis = {}
  emojiCount = 0
  averageDay = {"1d":0,"7d":0,"30d":0,"90d":0,"180d":0,"365d":0, "alltime":0}
  firstMsgTime = convertTime(messages[sendingTo][0][0], messages[sendingTo][0][1])
  averageTimes = [0,0,0]
  averageTime = 0
  currentUsernameStreak = ""
  longestMsgTime = 0
  longestTimes = [0,0,0]
  currentTimeStreak = firstMsgTime
  longestStreak = 0
  currentStreak = 0
  conversationTime = ""

  for (const message of messages[sendingTo]) {

      // Message Counting
      if (!messageCount[message[2]]) { messageCount[message[2]] = 0}
      messageCount[message[2]] += 1

      // Special String
      if (message[2] != sendingTo) { yourUsername = message[2] }
      if (message[3].includes("image omitted")) { specialString["image"] += 1 }
      if (message[3].includes("video omitted")) { specialString["video"] += 1 }
      if (message[3].includes("sticker omitted")) { specialString["sticker"] += 1 }
      if (message[3].includes("GIF omitted")) { specialString["gif"] += 1 }
      if (message[3].includes("You deleted this message.")) { specialString["YouDeleted"] += 1 }
      if (message[3].includes("This message was deleted.")) { specialString["TheyDeleted"] += 1 }

      // Parse Date
      time = convertTime(message[0], message[1])
      if (currentTime - time < 86400000) { times["1d"] += 1 }
      if (currentTime - time < 604800000) { times["7d"] += 1 }
      if (currentTime - time < 2592000000) { times["30d"] += 1 }
      if (currentTime - time < 7776000000) { times["90d"] += 1 }
      if (currentTime - time < 15552000000) { times["180d"] += 1 }
      if (currentTime - time < 31536000000) { times["365d"] += 1 }

      // Emojis
      emojiCheck = message[3].match(emojiRegex)
      if (emojiCheck) {
        for (const emoji of emojiCheck) {
          if (!emojis[emoji]) { emojis[emoji] = 1 } else { emojis[emoji] += 1 }
          emojiCount += 1
        }
      }
      // Time Streaks
      if (message[2] != currentUsernameStreak) {
        currentUsernameStreak = message[2]
        streakMsgTime = convertTime(message[0], message[1])
        timeDifference = streakMsgTime - currentTimeStreak
        averageTime += timeDifference
        if (timeDifference > longestMsgTime) { longestMsgTime = timeDifference; longestTime = streakMsgTime; console.log("New longest time"); console.log(longestTime) }
        currentTimeStreak = streakMsgTime
        if (timeDifference < 600000) { currentStreak += 1 } else { currentStreak = 0 }
        if (currentStreak > longestStreak) { longestStreak = currentStreak; conversationTime = streakMsgTime }
      }
  }
  // Averages
  timeSince = currentTime - firstMsgTime
  timeSince = timeSince / 86400000
  timeSince = Math.floor(timeSince)
  averageDay["1d"] = Math.round(times["1d"] / 1 * 100) / 100
  averageDay["7d"] = Math.round(times["7d"] / 7 * 100) / 100
  averageDay["30d"] = Math.round(times["30d"] / 30 * 100) / 100
  averageDay["90d"] = Math.round(times["90d"] / 90 * 100) / 100
  averageDay["180d"] = Math.round(times["180d"] / 180 * 100) / 100
  averageDay["365d"] = Math.round(times["365d"] / 365 * 100) / 100
  averageDay["alltime"] = Math.round(messages[sendingTo].length / timeSince * 100) / 100

  // Time Streaks
  
  averageTime = Math.round(averageTime / messages[sendingTo].length)
  averageTimeDate = new Date(averageTime)
  averageTimeDays = Math.floor(averageTime / 86400000)
  averageTimes = [averageTimeDays, averageTimeDate.getUTCHours().toString().padStart(2,"0"), averageTimeDate.getUTCMinutes().toString().padStart(2,"0"), averageTimeDate.getUTCSeconds().toString().padStart(2,"0")]

  longestTimeDate = new Date(longestMsgTime)
  longestTimeDays = Math.floor(longestMsgTime / 86400000)
  longestTimeTime = new Date(longestTime)
  longestTimes = [longestTimeDays, longestTimeDate.getUTCHours().toString().padStart(2,"0"), longestTimeDate.getUTCMinutes().toString().padStart(2,"0"), longestTimeDate.getUTCSeconds().toString().padStart(2,"0"),longestTimeTime.getUTCDate().toString().padStart(2,"0"), (longestTimeTime.getUTCMonth()+1).toString().padStart(2,"0"), longestTimeTime.getUTCFullYear().toString().padStart(2,"0")]

  conversationDate = new Date(conversationTime)
  convoTimes = [longestStreak, conversationDate.getUTCDate().toString().padStart(2,"0"), (conversationDate.getUTCMonth()+1).toString().padStart(2,"0"), conversationDate.getUTCFullYear().toString().padStart(2,"0")]

  mostUsedEmoji = Object.entries(emojis).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  mostUsedEmoji = [mostUsedEmoji, emojis[mostUsedEmoji]]
  return [sendingTo, messageCount, specialString, times, emojis, emojiCount, mostUsedEmoji, averageDay, averageTimes, longestTimes, convoTimes]
}

const analyseAll = function(){
    messageCount = {}
    // {name:total, [name:total]}
    mostCommonWords = {}
    mostCommon = {}
    // {name:[word, count]}
    for (const name in messages) {
        for (const message of messages[name]) {
            if (!messageCount[name]) { messageCount[name] = [] }
            if (!messageCount[name][messages[2]]) { messageCount[name][messages[2]] = 0}
            messageCount[name][message[2]] += 1
            for (word of message[3].split(" ")) {
                word = word.toLowerCase()
                if (!mostCommonWords[message[2]]) { mostCommonWords[message[2]] = {} }
                if (mostCommonWords[message[2]][word]) {
                    mostCommonWords[message[2]][word] += 1
                } else {
                    mostCommonWords[message[2]][word] = 1
                }
            }
        }
    }
    for (const name in mostCommonWords) {
        mostCommonWords[name] = Object.entries(mostCommonWords[name]).sort((a, b) => b[1] - a[1])
        mostCommon[name] = mostCommonWords[name][0]
    }
    for (const key in messageCount) {
      console.log(key)
      if (!(key in messages)) {
        yourUsername = key
      }
    }
    console.log(yourUsername)
    console.log(mostCommon)
    console.log(messageCount)
    resultsContent.innerHTML = ""
    for (const name in messages) {
      resultsContent.innerHTML += `<h2>${name}</h2><p>${yourUsername}'s messages = ${messageCount[yourUsername]}<br>${name}'s messages = ${messageCount[name]}</p>`
    }
}

// ---- FILE ----

const updateTabs = function(param) {
  const [sendingTo, messageCount, specialString, times, emojis, emojiCount, mostUsedEmoji, averageDay, averageTimes, longestTimes, convoTimes] = param
  // Get the chat-list and stats divs
  const chatList = document.querySelector('.chat-list');
  const stats = document.querySelector('.stats');
  buttonCount++
  
  // Loop through the chats array and create a button for each chat
  total = messageCount[yourUsername] + messageCount[sendingTo]
    const button = document.createElement('button');
    button.innerHTML = `<span class="chat-name">${sendingTo}</span><span class="message-count">${total}</span>`;
    const toChange = 
    `<h1>Your Chat with ${sendingTo}</h1>
    <div class="stats-grid" id="stats-grid">
    <div class="stat-box">
      <h2>Messages</h2><br>
      <p>${sendingTo}: <b>${messageCount[sendingTo]}</b></p>
      <p>${yourUsername}: <b>${messageCount[yourUsername]}</b></p><br>
      <p><i>This means that you've sent <b>${Math.round((messageCount[yourUsername] / (messageCount[sendingTo]+messageCount[yourUsername])*10000))/100}%</b> of messages in this chat!</i></p>
    </div>
    <div class="stat-box">
      <h2>Special Actions</h2>
      <p class="explain">images cool wow</p><br>
      <p>Images: <b>${specialString["image"]}</b></p>
      <p>Videos: <b>${specialString["video"]}</b></p>
      <p>Stickers: <b>${specialString["sticker"]}</b></p>
      <p>GIFs: <b>${specialString["gif"]}</b></p>
      <p>You Deleted: <b>${specialString["YouDeleted"]}</b></p>
      <p>They Deleted: <b>${specialString["TheyDeleted"]}</b></p>
    </div>
    <div class="stat-box">
      <h2>Amount of Messages</h2>
      <p class="explain">These are how many messages you've sent in the past:</p><br>
      <p>1 Day: <b>${times["1d"]}</b></p>
      <p>7 Days: <b>${times["7d"]}</b></p>
      <p>30 Days: <b>${times["30d"]}</b></p>
      <p>90 Days: <b>${times["90d"]}</b></p>
      <p>180 Days: <b>${times["180d"]}</b></p>
      <p>365 Days: <b>${times["365d"]}</b></p>
      <p>All Time: <b>${total}</b></p>
    </div>
    <div class="stat-box">
      <h2>Averages</h2>
      <p class="explain">These are the average amount of messages you've sent in these time frames: </p><br>
      <p>1 Day: <b>${averageDay["1d"]}</b></p>
      <p>7 Days: <b>${averageDay["7d"]}</b></p>
      <p>30 Days: <b>${averageDay["30d"]}</b></p>
      <p>90 Days: <b>${averageDay["90d"]}</b></p>
      <p>180 Days: <b>${averageDay["180d"]}</b></p>
      <p>365 Days: <b>${averageDay["365d"]}</b></p>
      <p>All Time: <b>${averageDay["alltime"]}</b></p>
    </div>
    <div class="stat-box">
      <h2>Emojis</h2><br>
      <p>Total: <b>${emojiCount}</b></p>
      <p>Most Used Emoji: ${mostUsedEmoji[0]} used <b>${mostUsedEmoji[1]}</b> time(s).</p>
    </div>
    <div class="stat-box">
      <h2>First Message</h2>
      <p class="explain">The first message in this chat is: </p><br>
      <p><b>${messages[sendingTo][0][2]}</b>: ${messages[sendingTo][0 ][3]}</p>
      <p>(Sent at <b>${messages[sendingTo][0][0]}</b> at <b>${messages[sendingTo][0][1]}</b>)</p>
    </div>
    <div class="stat-box">
      <h2>Last Message</h2>
      <p class="explain">The last message in this chat is: </p><br>
      <p><b>${messages[sendingTo].slice(-1)[0][2]}</b>: ${messages[sendingTo].slice(-1)[0][3]}</p>
      <p>(Sent at <b>${messages[sendingTo].slice(-1)[0][0]}</b> at <b>${messages[sendingTo].slice(-1)[0][1]}</b>)</p>
  </div>
  <div class="stat-box">
  <h2>Time Between Messages</h2>
  <p class="explain">A "conversation" is defined as no more of a gap of 10 minutes between messages.</p><br>
  <p>Average time between messages: <b>${averageTimes[0]>1?averageTimes[0] + ' days, ':''}${averageTimes[1]}:${averageTimes[2]}:${averageTimes[3]}</b></p>
  <p>Longest time between messages: <b>${longestTimes[0]>1?longestTimes[0] + ' days, ':''}${longestTimes[1]}:${longestTimes[2]}:${longestTimes[3]}</b> on <b>${longestTimes[4]}/${longestTimes[5]}/${longestTimes[6]}</b></p>
  <p>Longest conversation: <b>${convoTimes[0]}</b> messages on <b>${convoTimes[1]}/${convoTimes[2]}/${convoTimes[3]}</b></p>
  </div>
  <p class="credit">Made with 😎 by <a href="https://github.com/Unbaguettable" style="text-decoration: underline;color:white;" target="_blank" rel="noopener noreferrer">Unbaguettable</a></p>

    `
    button.addEventListener('click', () => {
      // Display the chat statistics when the button is clicked
      stats.innerHTML = toChange;
      masonry()
      
    });
    if (buttonCount == 1) { chatList.innerHTML = "<p class='credit' id='btnCount'>You have 0 chats uploaded</p>"; btnCountHTML = "You have 1 chat uploaded" } else { btnCountHTML = `You have ${buttonCount} chats uploaded`}
    document.getElementById("btnCount").innerHTML = btnCountHTML;
    chatList.appendChild(button);
}

// Add an event listener to the file input element that fires when a file is selected
const dropZone = document.getElementById('drop-zone'); // replace 'drop-zone' with the ID of the element where you want to drop the file

// Add event listeners to the drop zone
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleFileDrop);

// Define the handleDragOver function to allow dropping files onto the webpage
function handleDragOver(event) {
  event.preventDefault();
}

// Define the handleFileDrop function to handle the dropped file
function handleFileDrop(event) {
  event.preventDefault();

  // Get the dropped file
  const file = event.dataTransfer.files[0];

  // Create a new FileReader instance
  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    // Create a new JSZip instance to parse the contents of the zip file
    const zip = new JSZip();

    // Get the binary data of the zip file
    const zipData = event.target.result;

    // Use the JSZip library to load the contents of the zip file asynchronously
    zip.loadAsync(zipData).then((contents) => {
      // Get the contents of the "_chat.txt" file inside the zip file
      zipContents = contents;
      const fileData = zipContents.file("_chat.txt");

      // Read the file contents as a string and display them in the fileElement element
      fileData.async("string").then((fileContents) => {
        // Replace attachment links with base64-encoded image data
        replaceAttachmentLinks(fileContents).then((processedText) => {
          // Display the processed text in the fileElement element
          saveMessages(processedText)
          //fileElement.innerHTML = processedText;
        });
      });
    });
  });

  // Read the dropped file as an array buffer using the FileReader instance
  reader.readAsArrayBuffer(file);
}

const masonry = function() {
  const grid = document.querySelector('.stats-grid');
  const msnry = new Masonry( grid, {
    itemSelector: '.stat-box',
    percentPosition: true,
    transitionDuration: '0.2s',
    stagger: 30,
  });
}