export declare var isBluetoothEnabled: () => any;
export declare function hasCoarseLocationPermission(): boolean;
export declare function requestCoarseLocationPermission(resolve: any, reject: any): any;
export declare function startAdvertising(serviceUUID: string): void;
export declare var gattServerHook: {
    onCharacteristicReadRequest: (device: any, requestId: any, offset: any, characteristic: any) => void;
    onCharacteristicWriteRequest: (devices: any, requestId: any, characteristic: any, preparedWrite: any, responseNeeded: any, offset: any, value: any) => void;
};
export declare function serviceCharacteristics(serviceUUID: any, characteristics: any): void;
export declare function read(arg: any): Promise<{}>;
export declare function write(arg: any): Promise<{}>;
export declare function notify(arg: any): void;
export declare function closeServer(): void;
