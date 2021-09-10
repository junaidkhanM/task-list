import React from 'react';
import ListItem from './ListItem';
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='task-list'>
      {items.map((item) => {
        return (
          <ListItem item={item} removeItem={removeItem} editItem={editItem} />
        );
      })}
    </div>
  );
};

export default List;
