Expo Google Login
-> Get the sha-1 hash from google play console -> App Signing
-> Paste the hash to the Google Credentials - Android Client

Expo facebook
-> Get the sha-1 hash from google play console -> App Signing
-> In Terminal 

echo "SHA-1-KEY" | xxd -r -p | openssl base64

-> Copy the hash and paste it on Facebook Developers Console under Android -> Key Hashes