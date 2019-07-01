// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiurl: "http://192.168.43.218:8080/",
  //apiurl: "",
  loginURL: "https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signuporsignin&response_type=token&client_id=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790&scope=27fb84fe-4baf-4b6b-bfe7-f2d0638f2790%20openid&state=D9aUT4AWYPbEmL2htHtfVmNTNUH3umtisNaNYP-ctCo%3D&redirect_uri=http%3A%2F%2Flocalhost&fbclid=IwAR1w3B6Mhv6xY9TEK9IpXdZHla5NDEhk9Gddm9-GvVUEjzD_xC6bToB3xmg",
  logoutURL: "https://atlantisproject.b2clogin.com/atlantisproject.onmicrosoft.com/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost&p=b2c_1_signuporsignin",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
