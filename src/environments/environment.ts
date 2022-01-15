// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl:'http://localhost:5000/auth/',
  accountUrl: 'http://localhost:5000/accounts/',
  hospitalUrl: 'http://localhost:5000/hospital/',
  buildingUrl: 'http://localhost:5000/buildings/',
  wareHouseUrl: 'http://localhost:5000/warehouse/',
  wareHouseProductUrl: 'http://localhost:5000/warehouse-product/',
  replacementUrl: 'http://localhost:5000/replacement/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
