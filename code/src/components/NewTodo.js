import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';

// Reducers
import { todos } from '../reducers/todos';

// Styling
import { InnerFlexWrapper, Button } from '../styling/GlobalStyling';

// -----------------------------------------------------------------------------

export const NewTodo = ({ setAddTaskVisible }) => {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState('');
  const [category, setCategory] = useState('Fun');
  const [prio, setPrio] = useState(false);

  const options = [
    { value: 'Home', label: 'Home' },
    { value: 'Work', label: 'Work' },
    { value: 'Love', label: 'Love' },
    { value: 'Shop', label: 'Shop' },
    { value: 'Fix', label: 'Fix' },
  ];

  const handleSelectChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

  const createdId = Math.floor(Math.random() * 10000) + 1;

  const handleToggleCheckbox = () => {
    !prio ? setPrio(true) : setPrio(false);
  };

  // Close popup
  const handleCloseNewTask = () => {
    setAddTaskVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const createdAt = new Date();
    if (todo) {
      dispatch(
        todos.actions.addTodo({
          id: createdId,
          task: todo,
          category: category,
          prio: prio,
          isCompleted: false,
          createdAt: createdAt,
        })
      );
      setTodo('');
      setCategory('Fun');
      setPrio(false);
      setAddTaskVisible(false);
    } else {
      alert('Please write a task first');
    }
  };

  return (
    <NewTodoWrapper>
      <NewTodoInput
        type="text"
        placeholder="Add new task..."
        onChange={(event) => setTodo(event.target.value)}
        value={todo}
      />
      <CategoryAndPrioWrapper>
        <div>
          <Label>Set category:</Label>
          <CustomSelect
            value={category.value}
            onChange={handleSelectChange}
            options={options}
            placeholder="Select a category"
          />
        </div>
        <div>
          <Label htmlFor="newTask">Prioritized?</Label>
          <input
            type="checkbox"
            name="prioritized"
            id="newTask"
            checked={prio}
            onChange={handleToggleCheckbox}
          />
        </div>
      </CategoryAndPrioWrapper>
      <ButtonWrapper>
        <CloseButton type="button" onClick={handleCloseNewTask}>
          ✕
        </CloseButton>
        <NewTodoButton type="submit" value="submit" onClick={handleSubmit}>
          +
        </NewTodoButton>
      </ButtonWrapper>
    </NewTodoWrapper>
  );
};

// Local styles -----------------------------

const NewTodoWrapper = styled.div`
  position: fixed;
  display: flex;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 77%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  background: #fff;
  color: #000;
  border: 2px solid #fff;

  @media (min-width: 350px) {
    flex-direction: column;
  }

  & input {
    background: transparent;
  }
`;

const NewTodoInput = styled.input`
  padding: 10px 20px 10px 5px;
  border: none;
  border-bottom: 1px solid #000;
  margin: 5px 0 20px 0;
  background: #fff;
`;

const CategoryAndPrioWrapper = styled(InnerFlexWrapper)`
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CustomSelect = styled(Select)`
  width: 280px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 10px;
  text-transform: uppercase;
  padding-bottom: 20px;
`;

const ButtonWrapper = styled(InnerFlexWrapper)`
  margin-top: 10px;
`;
const CloseButton = styled(Button)`
  width: 50px;
  height: 50px;
`;

const NewTodoButton = styled.button`
  background: #4300ca;
  color: #fff;
  border-radius: 25px;
  padding: 5px;
  height: 50px;
  width: 50px;
  border: none;
  border: 1px solid #000;
  font-size: 24px;
  border: none;

  &:hover {
    cursor: pointer;
    background: #eae0ff;
    color: #4300ca;
  }
`;
