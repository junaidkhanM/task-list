import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import List from './List';
import { getLocalStorage } from './getLocalStorage';

export const listContext = React.createContext();

const FormInput = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const curItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(curItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <listContext.Provider
      value={{ alert, showAlert, list, removeItem, editItem }}
    >
      <form className='task-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}

        <h3>Task List</h3>
        <div className='form-control'>
          <input
            type='text'
            className='task-input'
            placeholder='e.g. task 1'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='btn submit-btn'>
            {isEditing ? 'edit' : 'add'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='task-container'>
          <List />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </listContext.Provider>
  );
};

export default FormInput;
