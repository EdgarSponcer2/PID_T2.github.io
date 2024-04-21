import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getControlMethods, getTuningParameters } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: controlMethods, isLoading: controlMethodsLoading, error: controlMethodsError } = useQuery(getControlMethods);
  const { data: tuningParameters, isLoading: tuningParametersLoading, error: tuningParametersError } = useQuery(getTuningParameters);

  if (controlMethodsLoading || tuningParametersLoading) return 'Loading...';
  if (controlMethodsError || tuningParametersError) return 'Error: ' + (controlMethodsError || tuningParametersError);

  return (
    <div className='p-4'>
      {controlMethods.map((controlMethod) => (
        <div key={controlMethod.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{controlMethod.name}</div>
          <div>
            {tuningParameters
              .filter((tp) => tp.controlMethodId === controlMethod.id)
              .map((tuningParameter) => (
                <div key={tuningParameter.id} className='ml-4'>
                  <div>{tuningParameter.name}: {tuningParameter.value}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;