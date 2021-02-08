Expo Google Login
-> Get the sha-1 hash from google play console -> App Signing
-> Paste the hash to the Google Credentials - Android Client

Expo facebook
-> Get the sha-1 hash from google play console -> App Signing
-> In Terminal 

echo "SHA-1-KEY" | xxd -r -p | openssl base64

-> Copy the hash and paste it on Facebook Developers Console under Android -> Key Hashes

For Video render in markdown:

In File ./xzero_app/node_modules/react-native-markdown-display/src/lib/AstRenderer.js
Line No - 59, Add the below code

if (node.type === 'image' && ['mp4', 'avi', 'flv', 'mov', 'mkv'].includes(node.content.substr(node.content.length - 3))) {
  node.type = 'video';
}
