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
export declare function closeServer(): void;
export declare function read(arg: any): Promise<{}>;
export declare function write(arg: any): Promise<{}>;
export declare function notify(arg: any): void;
