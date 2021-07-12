import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import getCategoriesData from '../data/getCategoriesData';
import { Routes } from '../models/app';
import { ICategory } from '../models/data';

const Menu = (): ReactElement => {
  const [isOpen, changeState] = useState(false);
  const [categoriesData, updateData] = useState((): ICategory[] => []);

  const menuHandler = () => {
    changeState(() => !isOpen);
  };

  useEffect(() => {
    getCategoriesData().then(data => updateData(data));
  }, []);

  const categories = categoriesData.map(category => (
    <li key={category.id} className="categories__item">
      <NavLink onClick={menuHandler} to={`/${category.id}`}>
        {category.name}
      </NavLink>
    </li>
  ));

  const cover = <div onClick={menuHandler} className="cover" aria-hidden="true" />;

  return (
    <>
      <button
        onClick={menuHandler}
        type="submit"
        className={`menu-btn_${isOpen ? 'opened' : 'closed'}`}
      >
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </button>
      <nav className="menu">
        <ul className={`categories ${isOpen ? 'opened' : 'closed'}`}>
          <NavLink
            onClick={menuHandler}
            exact
            to={Routes.main}
            className="categories__item main-nav-item"
          >
            Main
          </NavLink>
          <NavLink
            onClick={menuHandler}
            to={Routes.statistics}
            className="categories__item main-nav-item"
          >
            Statistics
          </NavLink>
          {categories}
        </ul>
      </nav>
      {isOpen ? cover : null}
    </>
  );
};

export default Menu;
