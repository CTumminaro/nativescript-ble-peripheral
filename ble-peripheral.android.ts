import * as application from 'application';
import * as utils from 'utils/utils';

/* Fix android for now */
var android: any;

var ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE = 222;

export class BlePeripheral {
  private adapter;
  //public characteristicLogging: boolean = true;

  constructor() {

    var bluetoothManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.BLUETOOTH_SERVICE);
    this.adapter = bluetoothManager.getAdapter();
  }

  private _isEnabled(args):Promise<{Generic}> {
    return this.adapter !== null && this.adapter.isEnabled();
  }

  public isBluetoothEnabled():Promise<{Generic}> {
    return new Promise(function (resolve, reject) {
      try {
        resolve(this._isEnabled());
      } catch (ex) {
        console.log("Error in Bluetooth.isBluetoothEnabled: " + ex);
        reject(ex);
      }
    });
  }

   private _coarseLocationPermissionGranted():boolean {
    var hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)
    if (!hasPermission) {
      hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ==
        android.support.v4.content.ContextCompat.checkSelfPermission(application.android.foregroundActivity, android.Manifest.permission.ACCESS_COARSE_LOCATION);
    }
    return hasPermission;
  }
  
  public hasCoarseLocationPermission():Promise<{Generic}> {
    return new Promise(function (resolve) {
      resolve(this._coarseLocationPermissionGranted());
    });
  }

  public requestCoarseLocationPermission():Promise<{Generic}> {
    return new Promise(function (resolve) {
      if (!this._coarseLocationPermissionGranted()) {
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
}
