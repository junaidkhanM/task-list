import React, { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { listContext } from './FormInput';

const ListItem = ({ item }) => {
  const { id, title } = item;
  const { removeItem, editItem } = useContext(listContext);

  return (
    <article className='task-item' key={id}>
      <p className='title'>{title}</p>
      <div className='btn-container'>
        <button type='button' className='edit-btn' onClick={() => editItem(id)}>
          <FaEdit />
        </button>
        <button
          type='button'
          className='delete-btn'
          onClick={() => removeItem(id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default ListItem;
