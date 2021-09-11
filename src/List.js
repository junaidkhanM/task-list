import React, { useContext } from 'react';
import { listContext } from './FormInput';
import ListItem from './ListItem';
const List = () => {
  const { list } = useContext(listContext);

  return (
    <div className='task-list'>
      {list.map((item) => {
        return <ListItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default List;
