export declare function isBluetoothEnabled(): Promise<{
    Generic;
}>;
export declare function hasCoarseLocationPermission(): Promise<{
    Generic;
}>;
export declare function requestCoarseLocationPermission(): Promise<{
    Generic;
}>;
export declare function startAdvertising(serviceUUID: string): void;
export declare function serviceCharacteristics(serviceUUID: any, characteristics: any): void;
