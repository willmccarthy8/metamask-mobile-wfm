import Clipboard from '@react-native-clipboard/clipboard';
import Device from '../util/device';
import Logger from '../util/Logger';

const EXPIRE_TIME_MS = 60000;

const ClipboardManager = {
  async getString(): Promise<string> {
    return await Clipboard.getString();
  },
  async setString(text: string): Promise<void> {
    await Clipboard.setString(text);
  },
  expireTime: null as ReturnType<typeof setTimeout> | null,
  async setStringExpire(text: string): Promise<void> {
    if (Device.isIos()) {
      try {
        await (Clipboard as unknown as { setStringExpire: (s: string) => Promise<void> }).setStringExpire(text);
      } catch (error) {
        // Fallback to regular setString if setStringExpire fails
        Logger.error(
          error as Error,
          'setStringExpire failed, falling back to setString',
        );
        await this.setString(text);
      }
    } else {
      await this.setString(text);
      if (this.expireTime) {
        clearTimeout(this.expireTime);
      }
      this.expireTime = setTimeout(async () => {
        const currentString = await this.getString();

        if (!currentString) return;

        try {
          await (Clipboard as unknown as { clearString: () => Promise<void> }).clearString();
        } catch (_) {
          //Fail silently
        }
      }, EXPIRE_TIME_MS);
    }
  },
};

export default ClipboardManager;
