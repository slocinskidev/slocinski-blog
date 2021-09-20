import { LINKS } from 'shared/constants/tests';

export const LinkPropsMock = {
  url: LINKS.HOME,
  variant: 'nav',
  customClass: 'test-class',
};

export const classNamesMock = [LinkPropsMock.customClass, 'link--nav'];
