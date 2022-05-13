import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StylesContext from '../../context/Styles';
import {
  IconButton,
  Menu,
  MenuButton as MenuBtn,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';

const MenuButton = () => {
  let { responsiveHeadingXl } = useContext(StylesContext);
  return (
    <Menu>
      <MenuBtn
        as={IconButton}
        aria-label="Menu"
        icon={<HiMenu />}
        fontSize={responsiveHeadingXl}
        variant="ghost"
      />
      <MenuList>
        <MenuGroup>
          <MenuItem fontWeight={'semibold'}>
            <Link to="/about">About</Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem fontWeight={'semibold'}>
            <Link to="/lessons/latest"> Lessons </Link>
          </MenuItem>
          <MenuItem fontWeight={'semibold'}>
            <Link to="/search"> Search </Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default MenuButton;
