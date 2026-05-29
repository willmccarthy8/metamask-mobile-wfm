# JavaScript-to-TypeScript Migration Instructions

> **Comprehensive step-by-step guide for completing the JS → TS migration of the `app/` directory.**

---

## Context

- **Repository:** `willmccarthy8/metamask-mobile-wfm` (branch: `main`)
- The codebase is **~88% TypeScript** already. Approximately **252 `.js` files** and **6 `.jsx` files** remain in the `app/` directory (including tests and mocks).
- `tsconfig.json` already has `"allowJs": true`, `"strict": true`, `"isolatedModules": true`, and `"jsx": "react-native"`.
- A **CI fitness function** at `.github/scripts/fitness-functions/rules/javascript-additions.ts` prevents new `.js`/`.jsx` files from being added to `app/`.
- Store migrations `028.ts` and above are already TypeScript; migrations `000.js`–`027.js` are still JavaScript.

---

## Step 0: Enumerate Remaining Files

Before starting any batch, run the following command to get the current list of remaining JS/JSX files:

```bash
find app -name "*.js" -o -name "*.jsx" | sort
```

Use this output to confirm which files still need migration and cross-reference against the batches below. The counts and file lists in this document reflect the state at the time of writing and may change as work progresses.

---

## Migration Batches

Migration is organized into **9 batches**, ordered from lowest risk/complexity to highest. Complete them in order.

---

### Batch 1: Store Migrations (lowest risk, isolated files)

**Files:**

- `app/store/migrations/000.js` through `app/store/migrations/027.js`
- Associated test files: `app/store/migrations/019.test.js` through `app/store/migrations/028.test.js`

**Instructions:**

1. These are self-contained migration functions with no UI dependencies.
2. Convert each `.js` file to `.ts`.
3. Add proper types for the `state` parameter and return value. Use `migration 028.ts` as a reference — it imports `hasProperty` and `isObject` from `@metamask/utils` and types the state as `unknown`.
4. For simpler migrations (e.g., `000.js`) that access `state.engine.backgroundState.*` directly, add a type guard or assertion using `isObject(state)` at the top.
5. Rename corresponding `.test.js` files to `.test.ts`.

**Reference pattern** (`app/store/migrations/028.ts`):

```typescript
import { hasProperty, isObject } from '@metamask/utils';
import { captureException } from '@sentry/react-native';

export default async function migrate(state: unknown) {
  if (!isObject(state)) {
    captureException(
      new Error(`Migration N: Invalid root state: root state is not an object`),
    );
    return state;
  }
  // ... migration logic ...
  return state;
}
```

---

### Batch 2: Constants and Simple Utility Files

**Files:**

- `app/constants/navigation.js`
- `app/constants/network.js`
- `app/images/image-icons.js`
- `app/lib/ens-ipfs/contracts/registry.js`
- `app/lib/ens-ipfs/contracts/resolver.js`
- `app/lib/ens-ipfs/resolver.js`
- `app/core/TransactionTypes.js`
- `app/core/DrawerStatusTracker.js`
- `app/core/ClipboardManager.js`
- `app/core/PreventScreenshot.js`
- `app/core/EntryScriptWeb3.js`

**Instructions:**

1. These are typically simple exports (objects, enums, strings, functions).
2. Rename `.js` → `.ts`.
3. Add type annotations to exported values. Use `as const` for constant objects/arrays where appropriate.
4. Check neighboring `.ts` files in the same directory for type patterns and naming conventions.

---

### Batch 3: Redux Actions

**Files:**

- `app/actions/alert/index.js`
- `app/actions/bookmarks/index.js`
- `app/actions/browser/index.js`
- `app/actions/collectibles/index.js`
- `app/actions/infuraAvailability/index.js`
- `app/actions/modals/index.js`
- `app/actions/notification/index.js`
- `app/actions/privacy/index.js`
- `app/actions/settings/index.js`
- `app/actions/settings/toggleBasicFunctionality.test.js`

**Instructions:**

1. Rename `.js` → `.ts` (and `.test.js` → `.test.ts`).
2. Type the action creators and action type constants.
3. Look at existing TS action files for patterns — e.g., `app/actions/navigation/index.ts` and `app/actions/navigation/types.ts`, or `app/actions/sdk/index.ts`.
4. If a `types.ts` file already exists in the same directory, import types from it. If not, define action types inline or create a `types.ts` alongside the converted file following existing patterns.

---

### Batch 4: Redux Reducers

**Files:**

- `app/reducers/alert/index.js`
- `app/reducers/bookmarks/index.js`
- `app/reducers/browser/index.js`
- `app/reducers/browser/index.test.js`
- `app/reducers/collectibles/index.js`
- `app/reducers/infuraAvailability/index.js`
- `app/reducers/modals/index.js`
- `app/reducers/notification/index.js`
- `app/reducers/notification/notification.test.js`
- `app/reducers/privacy/index.js`
- `app/reducers/settings/index.js`
- `app/reducers/swaps/index.js`

**Instructions:**

1. Rename `.js` → `.ts` (and `.test.js` → `.test.ts`).
2. Add state interface types and action types.
3. Follow patterns from existing TS reducers — e.g., `app/reducers/navigation/index.ts` and `app/reducers/navigation/types.ts`.
4. Type the initial state object, the reducer function parameters, and the return type.
5. Ensure the action types align with the corresponding action creators converted in Batch 3.

---

### Batch 5: Selectors and Utility Files

**Files (selectors):**

- `app/selectors/permissions/index.js`
- `app/selectors/permissions/index.test.js`

**Files (utilities):**

- `app/util/networks/index.js`
- `app/util/transactions/index.js`
- `app/util/general/index.js`
- `app/util/number/index.js`
- `app/util/device/index.js`
- `app/util/conversion/index.js`
- `app/util/conversions.js`
- `app/util/conversions.test.js`
- `app/util/confirm-tx.js`
- `app/util/confirmation/signatureUtils.js`
- `app/util/confirmation/signatureUtils.test.js`
- `app/util/confusables/index.js`
- `app/util/custom-gas/index.js`
- `app/util/date/index.js`
- `app/util/dapp-url-list.js`
- `app/util/ENSUtils.js`
- `app/util/etherscan.js`
- `app/util/gasUtils.js`
- `app/util/middlewares.js`
- `app/util/middlewares.test.js`
- `app/util/blockies.js`
- `app/util/payment-link-generator.js`
- `app/util/scaling.js`
- `app/util/streams.js`
- `app/util/walletconnect.js`

**Instructions:**

1. Rename `.js` → `.ts` (and `.test.js` → `.test.ts`).
2. These files may have **many consumers** across the codebase. Type function signatures carefully — incorrect types can cascade errors.
3. Start with functions that have clear input/output contracts. For complex utility functions, work through the type annotations incrementally.
4. Run `yarn lint:tsc` (type checking) and `yarn test:unit` after converting each file or small group of files to catch regressions early.
5. Check neighboring TypeScript files in the same directory for existing type patterns.

---

### Batch 6: Core Modules

**Files:**

- `app/core/BackgroundBridge/BackgroundBridge.js`
- `app/core/BackgroundBridge/BackgroundBridge.test.js`
- `app/core/NotificationManager.js`
- `app/core/MobilePortStream.js`
- `app/core/Permissions/specifications.js`
- `app/core/Permissions/specifications.test.js`
- `app/core/RPCMethods/eth-request-accounts.js`
- `app/core/RPCMethods/index.js`
- `app/core/RPCMethods/lib/ethereum-chain-utils.js`
- `app/core/RPCMethods/wallet_addEthereumChain.js`
- `app/core/RPCMethods/wallet_addEthereumChain.test.js`
- `app/core/RPCMethods/wallet_switchEthereumChain.js`
- `app/core/RPCMethods/wallet_switchEthereumChain.test.js`

**Instructions:**

1. These are **complex modules** with significant external dependencies and inter-module communication.
2. Rename `.js` → `.ts` (and `.test.js` → `.test.ts`).
3. Add types incrementally. For modules like `BackgroundBridge.js`, start by typing the constructor parameters and public methods, then work inward.
4. Use `any` **sparingly** — only when a proper type would require extensive upstream type changes. When `any` is unavoidable, always add a comment: `// TODO: Replace 'any' with proper type`.
5. For `MobilePortStream.js`, check if there are type definitions available from the `readable-stream` or `stream` packages.
6. For `RPCMethods/`, look at the request/response types from `@metamask/providers` or related MetaMask packages.

---

### Batch 7: Base and UI Components

**Files (Base):**

- `app/components/Base/DetailsModal.js`
- `app/components/Base/RangeInput.js`
- `app/components/Base/StatusText.js`
- `app/components/Base/TabBar.js`

**Files (UI — contains JSX, rename to `.tsx`):**

- `app/components/UI/AccountApproval/index.js`
- `app/components/UI/AccountInfoCard/index.js`
- `app/components/UI/AccountOverview/index.js`
- `app/components/UI/ActionModal/ActionContent/index.js`
- `app/components/UI/ActionModal/index.js`
- `app/components/UI/ActionView/index.js`
- `app/components/UI/AddressInputs/index.js`
- `app/components/UI/AddressInputs/index.test.jsx`
- `app/components/UI/AnimatedSpinner/index.js`
- `app/components/UI/AnimatedTransactionModal/index.js`
- `app/components/UI/AssetList/index.js`
- `app/components/UI/BasicFunctionality/BasicFunctionality.test.js`
- `app/components/UI/BasicFunctionality/BasicFunctionalityModal/BasicFunctionalityModal.test.js`
- `app/components/UI/Button/index.js`
- `app/components/UI/Charts/AdvancedChart/webview/chartLogic.js`
- `app/components/UI/Charts/AdvancedChart/webview/syncChartLogic.js`
- `app/components/UI/CollectibleContractInformation/index.js`
- `app/components/UI/CollectibleContractOverview/index.js`
- `app/components/UI/CollectibleOverview/index.js`
- `app/components/UI/Confetti/index.js`
- `app/components/UI/CustomAlert/index.js`
- `app/components/UI/EditGasFee1559/index.js`
- `app/components/UI/EditGasFeeLegacy/index.js`
- `app/components/UI/EthereumAddress/index.js`
- `app/components/UI/FadeAnimationView/index.js`
- `app/components/UI/FadeOutOverlay/index.js`
- `app/components/UI/FoxScreen/index.js`
- `app/components/UI/GlobalAlert/index.js`
- `app/components/UI/HintModal/index.js`
- `app/components/UI/ManageNetworks/ManageNetworks.test.js`
- `app/components/UI/Navbar/index.js`
- `app/components/UI/Navbar/index.test.jsx`
- `app/components/UI/NavbarBrowserTitle/index.js`
- `app/components/UI/NavbarTitle/index.js`
- `app/components/UI/NavbarTitle/index.test.js`
- `app/components/UI/NetworkMainAssetLogo/index.js`
- `app/components/UI/Notification/BaseNotification/index.js`
- `app/components/UI/Notification/BaseNotification/index.test.jsx`
- `app/components/UI/Notification/SimpleNotification/index.js`
- `app/components/UI/Notification/TransactionNotification/index.js`
- `app/components/UI/Notification/index.js`
- `app/components/UI/PaymentRequest/index.js`
- `app/components/UI/PaymentRequestSuccess/index.js`
- `app/components/UI/PhishingModal/index.js`
- `app/components/UI/ProtectYourWalletModal/index.js`
- `app/components/UI/ReceiveRequest/index.js`
- `app/components/UI/Screen/index.js`
- `app/components/UI/SeedphraseModal/index.js`
- `app/components/UI/SelectComponent/index.js`
- `app/components/UI/SettingsDrawer/index.js`
- `app/components/UI/SettingsNotification/index.js`
- `app/components/UI/SkipAccountSecurityModal/index.js`
- `app/components/UI/SliderButton/index.js`
- `app/components/UI/SlippageSlider/index.js`
- `app/components/UI/StyledButton/index.android.js`
- `app/components/UI/StyledButton/index.ios.js`
- `app/components/UI/StyledButton/index.js`
- `app/components/UI/SwitchCustomNetwork/index.js`
- `app/components/UI/Tabs/TabCountIcon/index.js`
- `app/components/UI/Tabs/index.js`
- `app/components/UI/TimeEstimateInfoModal/index.js`
- `app/components/UI/TokenImage/index.js`
- `app/components/UI/TransactionActionModal/TransactionActionContent/index.js`
- `app/components/UI/TransactionActionModal/index.js`
- `app/components/UI/TransactionElement/TransactionDetails/index.js`
- `app/components/UI/TransactionElement/index.js`
- `app/components/UI/TransactionElement/utils-gas.js`
- `app/components/UI/TransactionElement/utils.js`
- `app/components/UI/TransactionElement/utils.test.js`
- `app/components/UI/TransactionHeader/index.js`
- `app/components/UI/Transactions/index.js`
- `app/components/UI/WarningExistingUserModal/index.js`
- `app/components/UI/WebsiteIcon/index.js`
- `app/components/UI/WebviewError/index.js`
- `app/components/UI/WebviewProgressBar/index.js`

**Instructions:**

1. Files containing JSX must be renamed to `.tsx` (not `.ts`). Files that are pure logic with no JSX can be `.ts`.
2. Check each file for JSX usage — some `index.js` files in component directories contain JSX. For files that do contain JSX, use `git mv file.js file.tsx`.
3. Add prop types using **TypeScript interfaces**. Look for existing `PropTypes` definitions in the file and convert them to interfaces.
4. For test files: `.test.jsx` → `.test.tsx`, `.test.js` → `.test.ts` or `.test.tsx` (use `.test.tsx` if the test renders components with JSX).
5. Examine neighboring TypeScript components in the same directory for type patterns.
6. For `StyledButton/`, note the platform-specific files (`index.android.js`, `index.ios.js`, `index.js`) — rename all three consistently.
7. For chart webview files (`chartLogic.js`, `syncChartLogic.js`), these may be plain JS utility files — rename to `.ts` if they contain no JSX.

---

### Batch 8: Navigation and View Components

**Files (Navigation):**

- `app/components/Nav/Main/MainNavigator.js`
- `app/components/Nav/Main/MainNavigator.test.js`
- `app/components/Nav/Main/RootRPCMethodsUI.js`
- `app/components/Nav/Main/RootRPCMethodsUI.test.js`
- `app/components/Nav/Main/index.js`

**Files (Views — contains JSX, rename to `.tsx`):**

- `app/components/Views/AccountBackupStep1/index.js`
- `app/components/Views/AccountBackupStep1B/index.js`
- `app/components/Views/ActivityView/index.js`
- `app/components/Views/AddBookmark/index.js`
- `app/components/Views/AddressQRCode/index.js`
- `app/components/Views/Browser/index.js`
- `app/components/Views/CollectibleView/index.js`
- `app/components/Views/EnterPasswordSimple/index.js`
- `app/components/Views/ErrorBoundary/index.js`
- `app/components/Views/GasEducationCarousel/index.js`
- `app/components/Views/ImportFromSecretRecoveryPhrase/index.js`
- `app/components/Views/ImportPrivateKeySuccess/index.js`
- `app/components/Views/ManualBackupStep2/index.js`
- `app/components/Views/ManualBackupStep3/index.js`
- `app/components/Views/MediaPlayer/AndroidMediaPlayer.js`
- `app/components/Views/MediaPlayer/index.js`
- `app/components/Views/NavigationUnitTest/TestScreen1.test.js`
- `app/components/Views/NavigationUnitTest/TestScreen2.test.js`
- `app/components/Views/NavigationUnitTest/TestScreen3.test.js`
- `app/components/Views/NavigationUnitTest/index.js`
- `app/components/Views/OfflineMode/index.js`
- `app/components/Views/ResetPassword/index.js`
- `app/components/Views/Settings/AdvancedSettings/index.js`
- `app/components/Views/Settings/AppInformation/index.js`
- `app/components/Views/Settings/Contacts/ContactForm/index.js`
- `app/components/Views/Settings/Contacts/index.js`
- `app/components/Views/Settings/GeneralSettings/index.js`
- `app/components/Views/TermsAndConditions/index.js`
- `app/components/Views/TransactionSummary/index.js`
- `app/components/Views/TransactionsView/index.js`
- `app/components/Views/WalletConnectSessions/index.js`

**Files (Confirmations legacy components):**

- `app/components/Views/confirmations/legacy/components/AddressList/index.js`
- `app/components/Views/confirmations/legacy/components/Approval/ApprovalFlowLoader/index.js`
- `app/components/Views/confirmations/legacy/components/CustomNonceModal/index.js`
- `app/components/Views/confirmations/legacy/components/ErrorMessage/index.js`
- `app/components/Views/confirmations/legacy/components/WatchAssetRequest/index.js`
- `app/components/Views/confirmations/__mocks__/controllers/transaction-batch-mock.js`

**Instructions:**

1. Rename `.js` → `.tsx` for all files containing JSX. Use `.ts` for non-JSX files.
2. Add component prop and state types as interfaces.
3. For complex views like `Browser/index.js`, type incrementally — start with props and state, then add types to methods.
4. For Settings views, check if there are shared types for settings props/navigation.
5. For Navigation files, look at React Navigation type patterns used elsewhere in the codebase.

---

### Batch 9: Legacy JSX Files

**Files (source — rename `.jsx` → `.tsx`):**

- `app/components/Views/confirmations/legacy/components/EditGasFee1559Update/index.jsx`
- `app/components/Views/confirmations/legacy/components/EditGasFeeLegacyUpdate/index.jsx`
- `app/components/Views/confirmations/legacy/components/UpdateEIP1559Tx/index.jsx`

**Files (test — rename `.test.jsx` → `.test.tsx`):**

- `app/components/UI/AddressInputs/index.test.jsx`
- `app/components/UI/Navbar/index.test.jsx`
- `app/components/UI/Notification/BaseNotification/index.test.jsx`

**Instructions:**

1. Rename `.jsx` → `.tsx` using `git mv`.
2. Add prop interfaces. Check for existing `PropTypes` definitions and convert them.
3. These are legacy gas fee UI components — look at the TS types available from `@metamask/gas-fee-controller` or related packages for gas fee types.

---

### Batch 10: Test Utilities and Mock Files

**Files (test utilities):**

- `app/util/test/assetFileTransformer.js`
- `app/util/test/contract-address-registry.js`
- `app/util/test/ganache-seeder.js`
- `app/util/test/ganache.js`
- `app/util/test/network-store.js`
- `app/util/test/smart-contracts.js`
- `app/util/test/testSetup.js`
- `app/util/test/testSetupView.js`
- `app/util/test/utils.js`

**Files (mocks — lowest priority):**

- `app/__mocks__/@metamask/native-utils.js`
- `app/__mocks__/@myx-trade/sdk.js`
- `app/__mocks__/expo-apple-authentication.js`
- `app/__mocks__/expo-auth-session.js`
- `app/__mocks__/expo-haptics.js`
- `app/__mocks__/expo-screen-orientation.js`
- `app/__mocks__/hyperliquidMock.js`
- `app/__mocks__/pngMock.js`
- `app/__mocks__/react-native-device-info.js`
- `app/__mocks__/react-native-splash-screen.js`
- `app/__mocks__/react-native-view-shot.js`
- `app/__mocks__/rn-fetch-blob.js`
- `app/__mocks__/spinnerMock.js`
- `app/__mocks__/svgMock.js`

**Instructions:**

1. Test utility files: rename `.js` → `.ts` and add types.
2. Mock files (`app/__mocks__/`): these are standard Jest mocks and can be converted last or left as-is if they are trivial. If converting, rename `.js` → `.ts` and add minimal types.
3. For Jest `moduleNameMapper`-style mocks (e.g., `pngMock.js`, `svgMock.js`), check `jest.config.js` / `package.json` to ensure renaming doesn't break mock resolution. Update any mock path references if needed.

---

## Rules and Guidelines

### 1. One batch per PR
Each batch should be a separate PR for easier review. Name PRs consistently, e.g.:
- `chore: migrate store migrations to TypeScript (Batch 1)`
- `chore: migrate constants and simple utilities to TypeScript (Batch 2)`

### 2. Do NOT change behavior
This is a **pure type migration**. No logic changes. No refactors. No bug fixes. The only changes should be:
- File renames (`.js`/`.jsx` → `.ts`/`.tsx`)
- Added type annotations
- Removal of `PropTypes` imports/definitions (replaced by TypeScript interfaces)

### 3. Rename files properly
Use `git mv` to preserve file history:
```bash
# For non-JSX files
git mv app/path/to/file.js app/path/to/file.ts

# For JSX-containing files
git mv app/path/to/file.js app/path/to/file.tsx

# For .jsx files
git mv app/path/to/file.jsx app/path/to/file.tsx
```

### 4. Update all imports
After renaming, ensure all import paths still resolve. Metro and TypeScript typically handle extensionless imports, but:
- Check for any imports that explicitly use `.js` extensions and update them.
- Run `yarn lint:tsc` to catch any broken references.

### 5. Add explicit types
- Avoid using `any` wherever possible.
- When `any` is unavoidable for expediency, add a comment: `// TODO: Replace 'any' with proper type`
- Prefer specific types from MetaMask packages (`@metamask/utils`, `@metamask/controllers`, etc.).

### 6. Preserve existing tests
- Rename corresponding `.test.js` files to `.test.ts` or `.test.tsx` as appropriate.
- **Do NOT change test logic.** Only add types.
- Use `.test.tsx` when the test file contains JSX (renders components).

### 7. Run validation after each batch
```bash
# Type checking
yarn lint:tsc

# Linting
yarn lint

# Unit tests
yarn test:unit
```

### 8. Follow existing patterns
Always look at neighboring TypeScript files in the same directory for:
- Type patterns and naming conventions
- Import styles
- How interfaces/types are organized (inline vs. separate `types.ts` file)

### 9. No `@ts-ignore` or `@ts-expect-error`
Unless absolutely necessary and documented with a reason in a comment explaining why.

### 10. Handle `PropTypes` removal
When converting React components:
1. Find the `PropTypes` definition in the file.
2. Create an equivalent TypeScript `interface` (e.g., `interface MyComponentProps { ... }`).
3. Apply the interface to the component.
4. Remove the `import PropTypes from 'prop-types'` and the `Component.propTypes = { ... }` block.

---

## Final Verification

After all batches are complete, run:

```bash
find app -name "*.js" -o -name "*.jsx"
```

This should return **zero results** (excluding any files in `node_modules`). Then run the full validation suite:

```bash
yarn lint:tsc
yarn lint
yarn test:unit
```

All checks must pass to confirm the migration is complete and nothing is broken.
