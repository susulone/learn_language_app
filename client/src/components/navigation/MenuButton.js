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
          <MenuItem fontWeight={'semibold'}>
            <Link to="/lessons/latest"> Lessons </Link>
          </MenuItem>
          <MenuItem fontWeight={'semibold'}>
            <Link to="/search"> Search </Link>
          </MenuItem>
        </MenuGroup>
        {userRole === 'teacher' && (
          <MenuGroup title="Admin Tools:" textAlign="left" fontSize="md" ml="3">
            <MenuDivider />
            <MenuItem fontWeight={'semibold'} fontSize="sm" pl="5">
              <Link to="/admin/lessons">Lessons</Link>
            </MenuItem>
            <MenuItem fontWeight={'semibold'} fontSize="sm" pl="5">
              <Link to="/admin/words">Words</Link>
            </MenuItem>
          </MenuGroup>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuButton;
