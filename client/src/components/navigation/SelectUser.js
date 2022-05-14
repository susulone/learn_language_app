import React, { useContext } from 'react';
import GlobalContext from '../../contexts/Globals';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';

const SelectUser = () => {
  let { userRole, setUserRole } = useContext(GlobalContext);

  const prefix = useBreakpointValue({ base: '', md: `I'm a ` });
  const responsiveWidth = useBreakpointValue({ base: '6rem', md: '9.75rem' });
  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        size="sm"
        fontWeight="medium"
        rightIcon={<BiChevronDown />}
      >
        {prefix}
        {userRole}
      </MenuButton>
      <MenuList minWidth={responsiveWidth} fontSize="sm">
        <MenuOptionGroup defaultValue="student" type="radio">
          <MenuItemOption
            value="student"
            onClick={() => {
              setUserRole('student');
            }}
            fontWeight="medium"
          >
            student
          </MenuItemOption>
          <MenuItemOption
            value="teacher"
            onClick={() => {
              setUserRole('teacher');
            }}
            fontWeight="medium"
          >
            teacher
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default SelectUser;
