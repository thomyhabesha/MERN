// SearchContainer.jsx
import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const submit = useSubmit();

  // whenever anything in the form changes, serialize & re-submit all values
  const handleChange = (e) => {
    submit(e.currentTarget, { method: 'get', replace: true });
  };

  return (
    <Wrapper>
      <Form 
        method="get" 
        onChange={handleChange} 
        className="form"
      >
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={searchValues.search}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={searchValues.jobStatus}
          />

          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={searchValues.jobType}
          />

          <FormRowSelect
            name="sort"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue={searchValues.sort}
          />

          <button 
            type="button" 
            className="btn form-btn delete-btn"
            onClick={() => {
              // reset all filters back to defaults
              // this will clear out the URL and reload the loader
              window.location.href = '/dashboardLayout/allJobs';
            }}
          >
            Reset Search Values
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
