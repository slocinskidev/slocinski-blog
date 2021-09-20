import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { render, screen, userEvent } from 'testUtils';

import { classNamesMock, LinkPropsMock } from '../__mocks__/mock';
import Link from '../Link';
import { LinkProps } from '../models';

const { url } = LinkPropsMock;

const defaultProps: LinkProps = {
  ...(LinkPropsMock as LinkProps),
};

test('the Link component renders correctly with required and optional props', () => {
  const { rerender } = render(<Link {...defaultProps}>TestLink</Link>);

  const linkNode = screen.getByRole('link');

  // the component has been rendered
  expect(linkNode).toBeInTheDocument();

  // generating a snapshot, not for testing purposes but only to see what changes in the HTML structure during CR if the developer updates the snapshot
  expect(linkNode).toMatchSnapshot();

  // after click on link correct page appears
  userEvent.click(linkNode);
  expect(GatsbyLink).toHaveBeenCalledWith(expect.objectContaining({ to: url }), expect.anything());

  // link node receives correct classnames if provided
  expect(linkNode).toHaveClass(...classNamesMock);

  // rerender without optional props
  rerender(
    <Link url={LinkPropsMock.url} variant="regular">
      TestLink
    </Link>
  );

  // link node should not receive classnames if not provided
  expect(linkNode).not.toHaveClass(...classNamesMock);
});
