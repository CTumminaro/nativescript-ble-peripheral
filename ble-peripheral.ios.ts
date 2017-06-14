export class BlePeripheral {
  private _isEnabled(args) {
    return true;
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

  public hasCoarseLocationPermission():Promise<{Generic}> {
    return new Promise(function (resolve) {
      resolve(true);
    });
  }

  public requestCoarseLocationPermission():Promise<{Generic}> {
    return new Promise(function (resolve) {
      resolve(true);
    });
  }
}
