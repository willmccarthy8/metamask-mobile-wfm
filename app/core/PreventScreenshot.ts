import { NativeModules, Platform } from 'react-native';
import { isQa, isRc } from '../util/test/utils';

interface PreventScreenshotModule {
  forbid: () => Promise<boolean> | boolean;
  allow: () => Promise<boolean> | boolean;
}

const isAndroid: boolean = Platform.OS === 'android';

const PreventScreenshot: PreventScreenshotModule = {
  forbid:
    isQa || isRc
      ? () => true
      : isAndroid
        ? (NativeModules.PreventScreenshot as PreventScreenshotModule).forbid
        : () => true,
  allow:
    isQa || isRc
      ? () => true
      : isAndroid
        ? (NativeModules.PreventScreenshot as PreventScreenshotModule).allow
        : () => true,
};

export default PreventScreenshot;
