import { Observable } from 'data/observable';
import * as bluetooth from 'nativescript-ble-peripheral';

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();
    bluetooth.init();

    bluetooth.isBluetoothEnabled().then((granted) => {
      console.log("isBluetoothValid: ", granted);
    });

    bluetooth.hasCoarseLocationPermission().then((granted) => {
      console.log("hasCoarseLocationPermission", granted);

    });
  }
}
