// @ts-nocheck
import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  // This migration ensures that ignored tokens are in the correct form
  const allIgnoredTokens =
    bgState.TokensController.allIgnoredTokens || {};
  const ignoredTokens =
    bgState.TokensController.ignoredTokens || [];

  const reduceTokens = (tokens: Record<string, unknown>) =>
    tokens.reduce((final: Record<string, unknown>, token) => {
      const tokenAddress =
        (typeof token === 'string' && token) || token?.address || '';
      tokenAddress && final.push(tokenAddress);
      return final;
    }, []);

  const newIgnoredTokens = reduceTokens(ignoredTokens);

  const newAllIgnoredTokens : Record<string, unknown> = {};
  Object.entries(allIgnoredTokens).forEach(
    ([chainId, tokensByAccountAddress]) => {
      Object.entries(tokensByAccountAddress).forEach(
        ([accountAddress, tokens]) => {
          const newTokens = reduceTokens(tokens);
          if (newAllIgnoredTokens[chainId] === undefined) {
            newAllIgnoredTokens[chainId] = { [accountAddress]: newTokens };
          } else {
            newAllIgnoredTokens[chainId] = {
              ...newAllIgnoredTokens[chainId],
              [accountAddress]: newTokens,
            };
          }
        },
      );
    },
  );

  bgState.TokensController = {
    ...bgState.TokensController,
    allIgnoredTokens: newAllIgnoredTokens,
    ignoredTokens: newIgnoredTokens,
  };

  return state;
}
