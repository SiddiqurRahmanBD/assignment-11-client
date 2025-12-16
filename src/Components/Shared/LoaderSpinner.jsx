import React from 'react';
import { RiseLoader } from 'react-spinners';

const LoaderSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <RiseLoader size={100} color="red" />
    </div>
  );
};

export default LoaderSpinner;