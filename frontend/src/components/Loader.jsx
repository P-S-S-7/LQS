import React from 'react';
import { Circles } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Circles
        height="30"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
