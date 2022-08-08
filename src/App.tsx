import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import {list} from './list';

const ADDITIONAL_ITEMS = 5;

export const  App = () => {
  const [length, setLength] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLength(Math.round(document.documentElement.clientHeight/itemHeight) + ADDITIONAL_ITEMS)
  }, [itemHeight])

  useEffect(() => {
    if(ref?.current?.children[0]?.clientHeight) setItemHeight(ref?.current?.children[0]?.clientHeight)
  }, [ref])

  useEffect(() => {
    const handleScroll = () => {
      setLength(Math.round((document.documentElement.clientHeight + window.scrollY)/itemHeight) + ADDITIONAL_ITEMS)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [length, itemHeight]);

  return (
    <>
      <div className='additional'>HEADER</div>
      <div className='wrapper' ref={ref}>
        {list.slice(0, length).map(item => <div key={item.id} className='item'>ID: {item.id} TEXT:{item.text}</div>)}
      </div>
      <div className='additional'>FOOTER</div>
    </>
  );
}

