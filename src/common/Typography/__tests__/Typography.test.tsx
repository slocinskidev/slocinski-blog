import React from 'react';
import { render, screen } from 'testUtils';

import {
  bodyVariantClassname,
  TEST_TXT,
  typographyClassesMock,
  TypographyPropsMock,
} from '../__mock__/mock';
import { TypographyProps } from '../models';
import Typography from '../Typography';

const defaultProps: TypographyProps = {
  ...(TypographyPropsMock as TypographyProps),
};

it('Typography should render correcty with required and optional props', () => {
  const { rerender } = render(<Typography {...defaultProps}>{TEST_TXT}</Typography>);

  let TypographyNode = screen.getByTestId('typography');

  // it renders properly with all optional props
  expect(TypographyNode).toBeInTheDocument();

  // Create snapshot for CR purpouses
  expect(TypographyNode).toMatchSnapshot();

  // TypographyNode renders with all optional classnames received from props
  typographyClassesMock.forEach((classname) => {
    expect(TypographyNode).toHaveClass(classname);
  });

  rerender(<Typography variant="body1">{TEST_TXT}</Typography>);

  TypographyNode = screen.getByTestId('typography');

  // it renders without optional classnames when not provided
  typographyClassesMock.forEach((classname) => {
    expect(TypographyNode).not.toHaveClass(classname);
  });

  // it should not be present as heading when body1 variant is provided
  expect(screen.queryByRole('heading')).toBeNull();

  // it should receive body1 classname when body1 variant provided
  expect(TypographyNode).toHaveClass(bodyVariantClassname);
});
