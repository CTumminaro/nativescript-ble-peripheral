declare var CBCentralManagerStatePoweredOn;

export declare class BlePeripheral {
    private _isEnabled(args);
    isBluetoothEnabled(): Promise<{
        Generic;
    }>;
    hasCoarseLocationPermission(): Promise<{
        Generic;
    }>;
    requestCoarseLocationPermission(): Promise<{
        Generic;
    }>;
}
