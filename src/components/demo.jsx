import React, { useEffect, useState } from 'react';
import GetList from './getList';

export default function Demo(props){

  const [list, setList] = useState([]);

  useEffect(() => {
   let mounted = true;
   GetList()
     .then(items => {
       if(mounted) {
         setList(items)
       }
     })
  return () => mounted = false;
 }, [])

  return(
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
       {list.map(item => <li key={item.item}>{item.name}</li>)}
     </ul>
   </div>
 );
}
