export declare class BlePeripheral {
    private adapter;
    constructor();
    private _isEnabled(args);
    isBluetoothEnabled(): Promise<{
        Generic;
    }>;
    private _coarseLocationPermissionGranted();
    hasCoarseLocationPermission(): Promise<{
        Generic;
    }>;
    requestCoarseLocationPermission(): Promise<{
        Generic;
    }>;
}
