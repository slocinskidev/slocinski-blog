import React from 'react';
import InputSearch from 'components/InputSearch';

import './Header.scss';

const Header = () => {
  const [value, setValue] = React.useState<string>('');
  return (
    <header className="header">
      <div className="header__wrapper">
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
