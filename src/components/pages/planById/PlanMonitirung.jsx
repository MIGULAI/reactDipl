import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";



const PlanMonitirung = ({ planId }) => {
  const [typesCount, setTypesCount] = useState();
  const [plan, setPlan] = useState({});
  const [fetchMonitoring] = useFetching(
    async (planId) => {
      // console.log(planId);
      const response = await PostService.fetchMonitoring(planId);
      if (response.data.success) {
        setPlan(response.data.plan);
        const year = response.data.plan.Year
        setTypesCount({
          articles: response.data.data.articles.map((el) => new Date(Date.parse(`${year - 1}-09-01`) + el * 24 * 60 * 60 * 1000)),
          monographs: response.data.data.resultMonographs.map((el) => new Date(Date.parse(`${year - 1}-09-01`) + el * 24 * 60 * 60 * 1000)),
          scopus: response.data.data.resultScopus.map((el) => new Date(Date.parse(`${year - 1}-09-01`) + el * 24 * 60 * 60 * 1000)),
          teses: response.data.data.teses.map((el) => new Date(Date.parse(`${year - 1}-09-01`) + el * 24 * 60 * 60 * 1000)),
        });
      } else {
        // console.log('smth bad');
        setTypesCount(false);
      }
    })

  useEffect(() => {
    fetchMonitoring(planId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId])
  return (
    <div>
      {
        typesCount === false ?
          <div>Моніторинг не актуальний для даного плану</div> :
          <div>
            {
              typesCount && typesCount.teses.length !== 0 && <div>
                <p>Прогноз публікацій тез:</p>
                {typesCount && typesCount.teses.map((el, i) => {
                  if (i < plan.Theses) {
                    return (
                      <div key={i}>
                        <p> З {new Date(el - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} по {new Date(el + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            }
            {
              typesCount && typesCount.articles.length !== 0 && <div>
                <p>Прогноз статей:</p>
                {typesCount && typesCount.teses.map((el, i) => {
                  if (i < plan.ProfetionalArticles) {
                    return (
                      <div key={el}>
                        <p> З {new Date(el - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} по {new Date(el + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            }
            {
              typesCount && typesCount.monographs.length !== 0 && <div>
                <p>Прогноз монографій:</p>
                {typesCount && typesCount.teses.map((el, i) => {
                  if (i < plan.Manuals) {
                    return (
                      <div key={el}>
                        <p> З {new Date(el - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} по {new Date(el + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            }
            {
              typesCount && typesCount.scopus.length !== 0 && <div>
                <p>Прогноз публікацій в Scopus:</p>
                {typesCount && typesCount.teses.foreach((el, i) => {
                  if (i < plan.Scopus) {
                    return (
                      <div key={el}>
                        <p> З {new Date(el - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} по {new Date(el + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      </div>
                    )
                  }
                })}
              </div>
            }
          </div>
      }

    </div>
  );
}

PlanMonitirung.propTypes = {
  planId: PropTypes.number.isRequired
}

export default PlanMonitirung;
