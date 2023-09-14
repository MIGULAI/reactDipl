import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useFetching } from "../../../../hooks/useFetching";
import AnalyzeService from "../../../../API/AnalyzeService";
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const colors = [
    {
        line: '#D60202',
        bg: '#E5E5E5'
    },
    {
        line: '#1F1FF7',
        bg: '#E5E5E5'
    },
    {
        line: '#F98C61',
        bg: '#E5E5E5'
    },
    {
        line: '#F8F03D',
        bg: '#E5E5E5'

    }
];

const AuthorStats = ({ id }) => {
    const [typeCount, setTypeCount] = useState()
    const [fetchAuthorStat, isFetching, errFetching] = useFetching(async () => {
        const response = await AnalyzeService.fetchPublicationsCountByTypesAndAuthor(id)
        if (response.data.success) {
            setTypeCount(response.data.data)
        }
    }, true)
    useEffect(() => {
        errFetching && console.log(errFetching);
    },[errFetching])
    useEffect(() => {
        fetchAuthorStat()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return <div
    style={{ width: '100%', maxWidth: '1000px', height: 220,display: 'flex', flexWrap: 'wrap' }}
    >
        {
            (!typeCount && isFetching)
                ? <MyFileLoader />
                : Object.keys(typeCount).map((el, index) =>
                    <Line
                        key={index}
                        options={
                            {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: el,
                                    },
                                },
                                scales: {
                                    y: {
                                        min: 0,
                                    }
                                }
                            }
                        } data={{
                            labels: Object.keys(typeCount[el]),
                            datasets: [
                                {
                                    label: el,
                                    data: typeCount[el],
                                    borderColor: colors[index].line ? colors[index].line : colors[0].line,
                                    backgroundColor: colors[index].bg ? colors[index].bg : colors[0].bg,
                                }
                            ],
                        }} />
                )
        }
    </div>
}
AuthorStats.propTypes = {
    id: PropTypes.number,
    year: PropTypes.number
}
export default AuthorStats