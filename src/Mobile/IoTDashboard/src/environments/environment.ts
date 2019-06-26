// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  regmail: /^[^ @]+@[^ @]+\.[^ @]{2,}/,
  apiurl: "https://api.jikan.moe/v3",
  loginURL: "https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/authorize?client_id=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790&redirect_uri=http%3A%2F%2Flocalhost&response_mode=fragment&response_type=id_token&scope=openid&nonce=dummy&p=b2c_1_signuporsignin&fbclid=IwAR3F_wQlWzUyUpL0S45IKzm7pVAvNByU6tFpzGvla7dGeoO3g2zwGkpU9jw",
  };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
