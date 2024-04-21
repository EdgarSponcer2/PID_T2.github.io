import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getControlMethod, getTuningParameters, updateControlMethod, createTuningParameter, updateTuningParameter } from 'wasp/client/operations';

const ControlMethodPage = () => {
  const { controlMethodId } = useParams();
  const [controlMethod, setControlMethod] = useState(null);
  const [tuningParameters, setTuningParameters] = useState([]);
  const [newTuningParameterName, setNewTuningParameterName] = useState('');
  const [newTuningParameterValue, setNewTuningParameterValue] = useState(0);

  const { data: fetchedControlMethod, isLoading: controlMethodLoading, error: controlMethodError } = useQuery(getControlMethod, { id: controlMethodId });
  const { data: fetchedTuningParameters, isLoading: tuningParametersLoading, error: tuningParametersError } = useQuery(getTuningParameters, { controlMethodId: controlMethodId });
  const updateControlMethodFn = useAction(updateControlMethod);
  const createTuningParameterFn = useAction(createTuningParameter);
  const updateTuningParameterFn = useAction(updateTuningParameter);

  useEffect(() => {
    if (fetchedControlMethod) {
      setControlMethod(fetchedControlMethod);
    }
  }, [fetchedControlMethod]);

  useEffect(() => {
    if (fetchedTuningParameters) {
      setTuningParameters(fetchedTuningParameters);
    }
  }, [fetchedTuningParameters]);

  const handleUpdateControlMethod = (newName) => {
    updateControlMethodFn({ id: controlMethodId, name: newName });
  };

  const handleCreateTuningParameter = () => {
    createTuningParameterFn({ name: newTuningParameterName, value: newTuningParameterValue, controlMethodId });
    setNewTuningParameterName('');
    setNewTuningParameterValue(0);
  };

  const handleUpdateTuningParameter = (id, name, value) => {
    updateTuningParameterFn({ id, name, value, controlMethodId });
  };

  if (controlMethodLoading || tuningParametersLoading) return 'Loading...';
  if (controlMethodError || tuningParametersError) return 'Error: ' + (controlMethodError || tuningParametersError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{controlMethod.name}</h1>
      <div className='mb-4'>
        <input type='text' value={controlMethod.name} onChange={(e) => handleUpdateControlMethod(e.target.value)} className='border rounded px-2 py-1' />
      </div>
      <h2 className='text-lg font-semibold mb-2'>Tuning Parameters</h2>
      <div className='mb-4'>
        <input type='text' placeholder='Name' value={newTuningParameterName} onChange={(e) => setNewTuningParameterName(e.target.value)} className='border rounded px-2 py-1' />
        <input type='number' value={newTuningParameterValue} onChange={(e) => setNewTuningParameterValue(parseFloat(e.target.value))} className='border rounded px-2 py-1' />
        <button onClick={handleCreateTuningParameter} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>Add Tuning Parameter</button>
      </div>
      <div>
        {tuningParameters.map((tp) => (
          <div key={tp.id} className='flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-lg'>
            <div>{tp.name}</div>
            <div>{tp.value}</div>
            <div>
              <input type='text' value={tp.name} onChange={(e) => handleUpdateTuningParameter(tp.id, e.target.value, tp.value)} className='border rounded px-2 py-1' />
              <input type='number' value={tp.value} onChange={(e) => handleUpdateTuningParameter(tp.id, tp.name, parseFloat(e.target.value))} className='border rounded px-2 py-1' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlMethodPage;