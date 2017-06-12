import {Observable} from 'data/observable';
import {BlePeripheral} from 'nativescript-ble-peripheral';

export class HelloWorldModel extends Observable {
  public message: string;
  private blePeripheral: BlePeripheral;

  constructor() {
    super();

    this.blePeripheral = new BlePeripheral();
    this.message = this.blePeripheral.message;
  }
}