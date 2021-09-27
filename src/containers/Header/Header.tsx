import React from 'react';
import InputSearch from 'components/InputSearch';
import { navigate } from '@reach/router';

import './Header.scss';
import Logo from 'common/Logo';

const Header = () => {
  const [value, setValue] = React.useState<string>('');

  const submitSearchPhrase = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${value}`);
    setValue('');
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo customClass="header__logo" secondary />
        <form role="search" onSubmit={submitSearchPhrase}>
          <InputSearch
            type="text"
            handleOnChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            value={value}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
