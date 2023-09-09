import React, { useEffect, useState } from "react";
import { useFetching } from "../../../../hooks/useFetching";
import AnalyzeService from "../../../../API/AnalyzeService";
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
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import PropTypes from 'prop-types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const StudentCount = ({ width, height }) => {
    const [countYears, setCountYears] = useState()
    const [fetchStudentCount, isFetching, errFetching] = useFetching(async () => {
        const response = await AnalyzeService.fetchStudentCountStat()
        if (response.data.success) {
            setCountYears(response.data.data)
        }
    }, true)
    useEffect(() => {
        errFetching && console.log(errFetching);
    }, [errFetching])
    useEffect(() => {
        fetchStudentCount()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return <div
        style={{ width: width, height: height }}

    >
        {
            (!countYears && isFetching)
                ? <MyFileLoader />
                : <Bar
                    width={width}
                    height={height}
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
                        labels: Object.keys(countYears),
                        datasets: [
                            {
                                id: 1,
                                label: 'Залучення студентів за останні 5 років',
                                data: countYears,
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                        ],
                    }}
                />
        }
    </div>
}

StudentCount.defaultProps = {
    width: 440,
    height: 220
}

StudentCount.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}

export default StudentCount