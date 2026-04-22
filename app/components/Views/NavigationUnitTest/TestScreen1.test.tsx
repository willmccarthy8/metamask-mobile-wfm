/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
import React from 'react';
import NavigationUnitTest from '.';
import { render } from '@testing-library/react-native';

describe('NavigationUnitTest', () => {
  it('should render correctly', () => {
    const { toJSON } = render(
      <NavigationUnitTest firstRoute={'TestScreen1'} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
