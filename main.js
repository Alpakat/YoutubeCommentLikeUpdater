const clientID = ""
const clientKey = ""

//Redirect http://localhost

const code = ""
const refreshToken = ""

const commentId = ""

const { google } = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    clientID,
    clientKey,
    "http://localhost/"
)

oauth2Client.setCredentials({ refresh_token: refreshToken })

setInterval(()=>{

    getLikes()

}, 1800000)

getLikes()

function getUrl() {

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: "https://www.googleapis.com/auth/youtube.force-ssl"
    });

    console.log(url);

}

async function getTokesFromCode() {

    const { tokens } = await oauth2Client.getToken(code)
    console.log(tokens.refresh_token);

}

async function getLikes() {

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client,
    })

    const req = await youtube.comments.list({
        part: "snippet",
        id: commentId
    })

    const likes = req.data.items[0].snippet.likeCount

    let now = new Date();

    const likesText = "This Comment has " + likes + " Likes! And yes I'm using code to update this comment every 30 minutes... \nLast Update: " + now.toUTCString(); //And yes I'm using code to update this comment every 5 minutes...

    youtube.comments.update({
        part: "snippet",
        requestBody: {
            "id": commentId,
            "snippet": {
                "textOriginal": likesText
            }
        }
    })

    console.log(likes)

}