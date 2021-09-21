import React from 'react';
import InputSearch from 'components/InputSearch';

import './Header.scss';
import Logo from 'common/Logo';
import Typography from 'common/Typography';

const Header = () => {
  const [value, setValue] = React.useState<string>('');
  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo customClass="header__logo" secondary />
        <InputSearch
          type="text"
          handleOnChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          value={value}
        />
      </div>
    </header>
  );
};

export default Header;
