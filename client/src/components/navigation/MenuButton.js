import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
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
  let { userRole } = useContext(GlobalContext);
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
        {userRole === 'teacher' && (
          <MenuGroup>
            <MenuDivider />
            <MenuItem fontWeight={'semibold'}>
              <Link to="/add/lessons">Add Lessons</Link>
            </MenuItem>
            <MenuItem fontWeight={'semibold'}>
              <Link to="/add/words"> Add Words </Link>
            </MenuItem>
            <MenuItem fontWeight={'semibold'}>
              <Link to="/add/matches"> Add Word Pairs </Link>
            </MenuItem>
          </MenuGroup>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuButton;
