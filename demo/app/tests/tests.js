var BlePeripheral = require("nativescript-ble-peripheral").BlePeripheral;
var blePeripheral = new BlePeripheral();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(blePeripheral.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(blePeripheral.functionname()).toEqual(jasmine.any(Promise));
  });
});