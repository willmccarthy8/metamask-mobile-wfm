import AppConstants from '../../core/AppConstants';
import { toLowerCaseEquals } from '../../util/general';
import { isObject } from '@metamask/utils';

/**
 * MakerDAO DAI => SAI
 *
 **/
export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  const tokens = bgState.TokensController.tokens as unknown[];
  const migratedTokens : unknown[] = [];
  tokens.forEach((token) => {
    const typedToken = token as Record<string, unknown>;
    if (
      typedToken.symbol === 'DAI' &&
      toLowerCaseEquals(typedToken.address, AppConstants.SAI_ADDRESS)
    ) {
      typedToken.symbol = 'SAI';
    }
    migratedTokens.push(typedToken);
  });
  bgState.TokensController.tokens = migratedTokens;

  return state;
}
