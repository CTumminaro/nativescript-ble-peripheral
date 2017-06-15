import { Observable } from 'data/observable';
import * as bluetooth from 'nativescript-ble-peripheral';

var SERVICE_UUID = '6f6f02fc-af23-4b66-b204-c88e33174cb6';
var CHAR1_UUID = 'ef51fc4f-b204-495a-b01a-158cf8dbb988';
var CHAR2_UUID = '3a9d1a50-8c39-4bc0-b777-f21d46c9f19e';
var CHAR3_UUID = 'ae5438f6-6daf-4596-850a-01e1ed7d3b8f';

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();

    bluetooth.isBluetoothEnabled().then((enabled) => {
      console.log("isBluetoothValid:", enabled);

      if (enabled) {
        bluetooth.hasCoarseLocationPermission().then((granted) => {
          console.log("hasCoarseLocationPermission: ", granted);

          if (granted) {
            console.log('granted');
            this.initBluetooth();
          }else {
            bluetooth.requestCoarseLocationPermission().then(() => {
              console.log('requested');
            });
          }

        });
      }

    });
  }

  initBluetooth() {
    console.log('startAdvertising');
    bluetooth.startAdvertising(SERVICE_UUID);

    console.log('initBluetooth');
    bluetooth.serviceCharacteristics(SERVICE_UUID, [
      {
        UUID: CHAR1_UUID,
        properties: ['READ', 'WRITE', 'NOTIFY'],
        permissions: ['READ', 'WRITE' ]
      },
      {
        UUID: CHAR2_UUID,
        properties: ['READ'],
        permissions: ['READ']
      }
    ]);
  }
}
