if (typeof global.SharedArrayBuffer === 'undefined') {
  (global as any).SharedArrayBuffer = ArrayBuffer;
}

import "expo-router/entry";
