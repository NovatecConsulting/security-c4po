#### Create keystore for https support
1. > keytool -genkeypair -alias keystore -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore keystore.p12 -validity 3650
2. > move `keystore.p12` to `/src/main/resources`

(Choose password "*secret*", or choose a different one and change it in the `application.properties` accordingly.
You can leave all the other fields blank.)
