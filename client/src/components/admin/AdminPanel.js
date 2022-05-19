import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../../contexts/Globals';
import StylesContext from '../../contexts/Styles';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
  Button,
  IconButton,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { FiEdit, FiX } from 'react-icons/fi';

const AdminPanel = () => {
  const { responsiveButtonSm } = useContext(StylesContext);
  let { lessonId, setLessons, lessons } = useContext(GlobalContext);
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const handleDelete = async e => {
    try {
      const response = await axios.delete(`/api/lessons/${lessonId}`);
      const lessonsList = lessons.filter(lesson => lesson.id !== lessonId);
      setLessons(lessonsList);
      toast({
        title: 'Lesson deleted.',
        description: 'The lesson has been deleted from the database.',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Flex width="100%" direction="row" justify="center">
      <Button
        leftIcon={<FiEdit />}
        aria-label="Edit"
        size={responsiveButtonSm}
        variant="ghost"
        onClick={() =>
          navigate(`/admin/lessons/edit/${lessonId}`, { state: lessonId })
        }
        _hover={{
          transform: 'scale(0.9)',
          color: '#bec3c9',
        }}
      >
        Edit lesson
      </Button>
      <>
        <Button
          leftIcon={<FiX />}
          aria-label="Delete lesson"
          size={responsiveButtonSm}
          variant="ghost"
          onClick={onOpen}
          _hover={{
            transform: 'scale(0.9)',
            color: '#bec3c9',
          }}
        >
          Delete lesson
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete this lesson
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    handleDelete();
                    onClose();
                    navigate('/admin/lessons/');
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </Flex>
  );
};

export default AdminPanel;
