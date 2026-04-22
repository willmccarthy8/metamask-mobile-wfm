/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
// Third party dependencies.
import React from 'react';

// Internal dependencies.
import BasicFunctionality from './BasicFunctionality';
import renderWithProvider from '../../../util/test/renderWithProvider';

describe('BasicFunctionality', () => {
  it('should render correctly', () => {
    const { toJSON } = renderWithProvider(<BasicFunctionality />);
    expect(toJSON()).toMatchSnapshot();
  });
});
