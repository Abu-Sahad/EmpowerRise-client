import React from 'react';

const DropDown = ({List,handler}) => {
    return (
      <div>
        <select
          className="border rounded-sm border-gray-200 font-light font-poppins ps-4 mt-3 h-10 w-32 bg-white"
          onChange={handler}
        >
          <option >
            Select
            </option>
          {List.map((item) => (
            <option key={item._id} value={item.field} className='uppercase'>
              {item.field}
            </option>
          ))}
        </select>
      </div>
    );
};

export default DropDown;