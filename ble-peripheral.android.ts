import * as application from 'application';
import * as utils from 'utils/utils';
import { btoa, stringToUuid } from './helpers';

/* Fix android for now */
declare var android: any;

/**********************************
 * Varialbes
 **********************************
 */
var ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE = 222;
var bluetoothLeAdvertiser,
    gattServer;
//public characteristicLogging: boolean = true;

/**
 * Start bluetoothManager and get adapter
 */
 var bluetoothManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.BLUETOOTH_SERVICE);
 var bluetoothAdapter = bluetoothManager.getAdapter();


/**********************************
 * Permissions
 **********************************
 */

// Check if bluetooth is enabled
function _isEnabled():Promise<{Generic}> {
  console.log("adapter: ", bluetoothAdapter);
  console.log("isEnabled: ", bluetoothAdapter.isEnabled());
  return bluetoothAdapter !== null && bluetoothAdapter.isEnabled();
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


// Check for Course Location Permissions
function _coarseLocationPermissionGranted() {
  var hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)
  if (!hasPermission) {
    hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ==
      android.support.v4.content.ContextCompat.checkSelfPermission(application.android.foregroundActivity, android.Manifest.permission.ACCESS_COARSE_LOCATION);
      console.log('hasPermission: ', hasPermission);
  }
  return hasPermission;
}

export function hasCoarseLocationPermission():Promise<{Generic}> {
  return new Promise(function (resolve) {
    resolve(_coarseLocationPermissionGranted());
  });
}

// Request Permissions
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

/**********************************
 * Advertising
 **********************************
 */

var advertiseCallback = android.bluetooth.le.AdvertiseCallback.extend({
    onStartSuccess: function(settingsInEffect){
      console.log("AdvertiseCallback success: ", settingsInEffect);
        //super.onStartSuccess(settingsInEffect);
    },

    onStartFailure: function(errorCode){
      console.log("AdvertiseCallback error: ", errorCode);
        //Log.e("JJP", "Advertising onStartFailure: " + errorCode);
        //super.onStartFailure(errorCode);
    }
});

export function startAdvertising(serviceUUID:string) {
  bluetoothLeAdvertiser = bluetoothAdapter.getBluetoothLeAdvertiser();
  gattServer = bluetoothManager.openGattServer(utils.ad.getApplicationContext(), new gattServerCallback());

 if (bluetoothLeAdvertiser != null) {
   var settings = new android.bluetooth.le.AdvertiseSettings.Builder()
           .setAdvertiseMode(android.bluetooth.le.AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
           .setConnectable(true)
           .setTimeout(0)
           .setTxPowerLevel(android.bluetooth.le.AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
           .build();
   var data = new android.bluetooth.le.AdvertiseData.Builder()
           .setIncludeDeviceName(false)
           .addServiceUuid(new android.os.ParcelUuid(stringToUuid(serviceUUID)))
           .build();

   bluetoothLeAdvertiser.startAdvertising(settings, data, new advertiseCallback);
 }
}

/**********************************
 * gattServerCallback Override
 **********************************
 */
var gattServerCallback = android.bluetooth.BluetoothGattServerCallback.extend({
  onConnectionStateChange: function(device, status, newState) {
    console.log('device ', device);
    /*if (newState == android.bluetooth.BluetoothProfile.STATE_CONNECTED)
      {
          console.log("device:", device);
          connectedDevice = device;
          //connectedDevices.push(device);
      }
      else if (newState == android.bluetooth.BluetoothProfile.STATE_DISCONNECTED)
      {
        console.log('device disconnected');
          //connectedDevices.remove(device);
      }*/
  },
  onCharacteristicReadRequest: function(device, requestId, offset, characteristic) {
    console.log('onCharacteristicReadRequest');
  },
  onCharacteristicWriteRequest: function (devices, requestId, characteristic, preparedWrite, responseNeeded, offset, value) {
    console.log('onCharacteristicWriteRequest');
  }
});

/**********************************
 * Setup Server Characteristics
 **********************************
 */
 var getProperty = {
   BROADCAST: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_BROADCAST,
   NOTIFY: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_NOTIFY,
   EXTENDED_PROPS: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_EXTENDED_PROPS,
   EXTENDED_INDICATE: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_INDICATE,
   READ: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_READ,
   SIGNED_WRITE: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_SIGNED_WRITE,
   WRITE: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_WRITE,
   WRITE_NO_RESPONSE: android.bluetooth.BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE
 };
 var getPermission = {
   READ: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_READ,
   READ_ENCRYPTED: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_READ_ENCRYPTED,
   READ_ENCRYPTED_MITM: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_READ_ENCRYPTED_MITM,
   WRITE: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_WRITE,
   WRITE_ENCRYPTED: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_WRITE_ENCRYPTED,
   WRITE_ENCRYPTED_MITM: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_WRITE_ENCRYPTED_MITM,
   WRITE_SIGNED: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_WRITE_SIGNED,
   WRITE_SIGNED_MITM: android.bluetooth.BluetoothGattCharacteristic.PERMISSION_WRITE_SIGNED_MITM
 }
 export function serviceCharacteristics(serviceUUID, characteristics) {
   var service = new android.bluetooth.BluetoothGattService(stringToUuid(serviceUUID), android.bluetooth.BluetoothGattService.SERVICE_TYPE_PRIMARY);

   characteristics.map((characteristic) => {
     var properties = null,
        permissions = null;

     characteristic.properties.map((property, index) => {
       if (index > 0) {
         properties = properties | getProperty[property];
       }else {
         properties = getProperty[property];
       }
     });

     characteristic.permissions.map((permission, index) => {
       if (index > 0) {
         permissions = permissions | getPermission[permission];
       }else {
         permissions = getPermission[permission];
       }
     });

     service.addCharacteristic(
       new android.bluetooth.BluetoothGattCharacteristic(stringToUuid(characteristic.UUID),
       properties,
       permissions));
   });

  gattServer.addService(service);
 }
