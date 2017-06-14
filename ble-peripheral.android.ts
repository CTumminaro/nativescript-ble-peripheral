import * as application from 'application';
import * as utils from 'utils/utils';

/* Fix android for now */
declare var android: any;

var ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE = 222;
var bluetoothManager,
    adapter;
//public characteristicLogging: boolean = true;

export function init() {
  bluetoothManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.BLUETOOTH_SERVICE);
  adapter = bluetoothManager.getAdapter();
}

function _isEnabled():Promise<{Generic}> {
  return adapter !== null && adapter.isEnabled();
}

export function isBluetoothEnabled():Promise<{Generic}> {
  return new Promise(function (resolve, reject) {
    try {
      resolve(_isEnabled());
    } catch (ex) {
      console.log("Error in Bluetooth.isBluetoothEnabled: " + ex);
      reject(ex);
    }
  });
}

 function _coarseLocationPermissionGranted():boolean {
  var hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)
  if (!hasPermission) {
    hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ==
      android.support.v4.content.ContextCompat.checkSelfPermission(application.android.foregroundActivity, android.Manifest.permission.ACCESS_COARSE_LOCATION);
  }
  return hasPermission;
}

export function hasCoarseLocationPermission():Promise<{Generic}> {
  return new Promise(function (resolve) {
    resolve(_coarseLocationPermissionGranted());
  });
}

export function requestCoarseLocationPermission():Promise<{Generic}> {
  return new Promise(function (resolve) {
    if (!_coarseLocationPermissionGranted()) {
      // in a future version we could hook up the callback and change this flow a bit
      android.support.v4.app.ActivityCompat.requestPermissions(
          application.android.foregroundActivity,
          [android.Manifest.permission.ACCESS_COARSE_LOCATION],
          ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE);
      // this is not the nicest solution as the user needs to initiate scanning again after granting permission,
      // so enhance this in a future version, but it's ok for now
      resolve();
    }
  });
}
