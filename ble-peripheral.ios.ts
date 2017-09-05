
import { btoa, stringToUuid } from './helpers';

/**********************************
 * Varialbes
 **********************************
 */
var _state = {
  manager: null,
  centralDelegate: null,
  peripheralArray: null,
  connectCallbacks: {},
  disconnectCallbacks: {},
  onDiscovered: null
};
declare var CBCentralManagerStatePoweredOn;


 /**********************************
  * Start bluetoothManager and get adapter
  **********************************
  */


/**********************************
 * Permissions
 **********************************
 */

// Check if bluetooth is enabled
function _isEnabled() {
  console.log("isEnabled: ", _state.manager.state);
  return _state.manager.state == CBCentralManagerStatePoweredOn;
}

export var isBluetoothEnabled = function () {
  return _isEnabled();
};

// Check for Course Location Permissions
export function hasCoarseLocationPermission() {
  return true;
}

// Request Permissions
export function requestCoarseLocationPermission(resolve, reject) {

}
