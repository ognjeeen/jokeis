'use client';
import MoonLoader from 'react-spinners/MoonLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <MoonLoader
      color="#545454"
      loading={loading}
      cssOverride={override}
      size={60}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
