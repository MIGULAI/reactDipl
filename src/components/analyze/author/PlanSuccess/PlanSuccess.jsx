import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useFetching } from "../../../../hooks/useFetching";
import PostService from "../../../../API/PostService";
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import classes from './PlanSuccess.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PlanSuccess = ({ id, year }) => {
    const [planData, setPlanData] = useState()
    const [plan, setPlan] = useState()
    const [fetchPlanStat, isFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchPlanByAuthorAndYear(id, year)
        if (response.data.success) {
            setPlanData(response.data.data.resultData)
            setPlan(response.data.data.plan)
        } else {

        }
    }, true)
    useEffect(() => {
        errFetching && console.log(errFetching);
    },[errFetching])
    useEffect(() => {
        fetchPlanStat()
    }, [year]) // eslint-disable-line react-hooks/exhaustive-deps
    return <>
        {
            (isFetching)
                ? <MyFileLoader />
                : <div className={classes.block}>
                    <div className={classes.graph}>
                        <Bar
                            width={440}
                            height={220}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: false,
                                        text: 'Залучення студентів за останні 5 років',
                                    },
                                },
                            }}
                            data={{
                                labels:  Object.keys(plan),
                                datasets: [
                                    {
                                        id: 1,
                                        label: 'План',
                                        data: plan,
                                        backgroundColor: '#FF6384',
                                    }, {
                                        id: 2,
                                        label: 'Факт',
                                        data: planData,
                                        backgroundColor: '#000000',
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div>
                        <label>{'Процент виконання плану'}</label>
                        {
                            Object.keys(plan).map(el =>
                                <div key={el} className={classes.item}>
                                    <span>{el}</span>
                                    <span>{
                                    plan[el] !== 0 ? planData[el] / plan[el] * 100 + '%' : '-'
                                    }</span>
                                </div>
                            )
                        }
                    </div>
                </div>
        }
    </>
}


PlanSuccess.propTypes = {
    id: PropTypes.number,
    year: PropTypes.number
}
export default PlanSuccess