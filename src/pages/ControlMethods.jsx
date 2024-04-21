import React, { useState } from 'react';
import { useQuery, useAction, getControlMethods, createControlMethod } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const ControlMethodsPage = () => {
  const { data: controlMethods, isLoading, error } = useQuery(getControlMethods);
  const createControlMethodFn = useAction(createControlMethod);
  const [newControlMethodName, setNewControlMethodName] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateControlMethod = () => {
    createControlMethodFn({ name: newControlMethodName });
    setNewControlMethodName('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Control Method'
          className='px-1 py-2 border rounded text-lg'
          value={newControlMethodName}
          onChange={(e) => setNewControlMethodName(e.target.value)}
        />
        <button
          onClick={handleCreateControlMethod}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Control Method
        </button>
      </div>
      <div>
        {controlMethods.map((controlMethod) => (
          <div
            key={controlMethod.id}
            className='py-2 px-2 flex items-center hover:bg-gray-100 gap-x-2 rounded'
          >
            <p>{controlMethod.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControlMethodsPage;