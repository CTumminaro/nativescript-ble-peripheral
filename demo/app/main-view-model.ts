import { Observable} from 'data/observable';
import { BlePeripheral } from 'nativescript-ble-peripheral';

export class HelloWorldModel extends Observable {
  public message: string;
  private blePeripheral: BlePeripheral;

  constructor() {
    super();

    this.blePeripheral = new BlePeripheral();

    this.blePeripheral.isBluetoothEnabled().then((granted) => {
      console.log("isBluetoothValid: ", granted);
    });

    this.blePeripheral.hasCoarseLocationPermission().then((granted) => {
      console.log("hasCoarseLocationPermission", granted);

    });
  }
}
