import React from 'react';
import CardUser from './CardUser';

const loopData = (data) => {
  const elements = [];
  if (data.length === 0) {
    return (
      <div className='col-12 mt-2'>{`We can't find any user to show`}</div>
    );
  }
  for (let i = 0; i < data.length; i++) {
    console.log('list data user', data[i]);
    const element = (
      <React.Fragment key={`user-${i}`}>
        <CardUser
          id={data[i].id}
          firstName={data[i].firstName}
          lastName={data[i].lastName}
          image={data[i].image}
        />
      </React.Fragment>
    );
    elements.push(element);
  }
  return elements;
};

function ListUser(props) {
  return <>{loopData(props.data)}</>;
}

export default ListUser;
