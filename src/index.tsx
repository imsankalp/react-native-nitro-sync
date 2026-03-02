import { NitroModules } from 'react-native-nitro-modules';
import type { NitroSync } from './NitroSync.nitro';

const NitroSyncHybridObject =
  NitroModules.createHybridObject<NitroSync>('NitroSync');

export function multiply(a: number, b: number): number {
  return NitroSyncHybridObject.multiply(a, b);
}
