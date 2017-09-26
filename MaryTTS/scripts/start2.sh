#/home/user/Downloads/marytts-5.2/bin/marytts-server
#node SpeakServer/RemoteConsoleServer.js

/home/user/Downloads/marytts-5.2/bin/marytts-server > /dev/null 2>&1 &
node /media/sf_Dropbox/projects/delegation/Reader/TTS-Reader/Server.js > /dev/null 2>&1 &
node SpeakServer/RemoteConsoleServer.js   > /dev/null 2>&1 &