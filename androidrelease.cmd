ionic cordova build --release android
rem done already: keytool -genkey -v -keystore brucelane.keystore -alias brucelane -keyalg RSA -keysize 2048 -validity 10000
cd platforms\android\build\outputs\apk
copy ..\..\..\brucelane.keystore
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore brucelane.keystore .\android-release-unsigned.apk brucelane
jarsigner -verify -verbose -certs .\android-release-unsigned.apk
cd "C:\Program Files (x86)\Android\android-sdk\build-tools\23.0.3"
.\zipalign.exe -v 4 C:\cpp\videodromm\videodromm-mobile\platforms\android\build\outputs\apk\android-release-unsigned.apk  C:\cpp\videodromm\videodromm-mobile\platforms\android\build\outputs\apk\videodromm0.1.20170710.apk