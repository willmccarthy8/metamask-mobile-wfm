const noop = (): Record<string, never> => ({});

interface RNFetchBlobMock {
  DocumentDir: () => Record<string, never>;
  fetch: () => Record<string, never>;
  base64: () => Record<string, never>;
  android: () => Record<string, never>;
  ios: () => Record<string, never>;
  config: () => Record<string, never>;
  session: () => Record<string, never>;
  fs: {
    writeFile: () => Promise<void>;
    exists: () => Promise<void>;
    mkdir: () => Promise<void>;
    dirs: {
      CacheDir: () => Record<string, never>;
      DocumentDir: () => Record<string, never>;
    };
  };
  wrap: () => Record<string, never>;
}

const rnFetchBlobMock: RNFetchBlobMock = {
  DocumentDir: noop,
  fetch: noop,
  base64: noop,
  android: noop,
  ios: noop,
  config: noop,
  session: noop,
  fs: {
    writeFile: (): Promise<void> => Promise.resolve(),
    exists: (): Promise<void> => Promise.resolve(),
    mkdir: (): Promise<void> => Promise.resolve(),
    dirs: {
      CacheDir: noop,
      DocumentDir: noop,
    },
  },
  wrap: noop,
};

export default rnFetchBlobMock;
