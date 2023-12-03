import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";

const PlanMonitirung = ({planId}) => {

  const [fetchMonitoring, isFetching, err] = useFetching(
    async (planId) => {
      const response = await PostService.fetchMonitoring(planId);
      if(response.body.success){
        console.log(response.body);

      }else {
        console.log('smth bad');
      }
  })

  useEffect(() => {
    console.log(planId);
    fetchMonitoring(planId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[planId])
  return (
    <div>
      <p>Plan id {planId}</p>
    </div>
  );
}

PlanMonitirung.propTypes = {
  planId: PropTypes.number.isRequired
}

export default PlanMonitirung;
