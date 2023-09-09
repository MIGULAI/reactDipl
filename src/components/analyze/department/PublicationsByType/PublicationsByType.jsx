import React, { useEffect, useState } from "react";
import { useFetching } from "../../../../hooks/useFetching";
import AnalyzeService from "../../../../API/AnalyzeService";
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
import PropTypes from 'prop-types';
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";

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

const PublicationsByType = ({ width, height }) => {
    const [typesCount, setTypesCount] = useState()
    const [fetchTypeCount, isFetching, errFetching] = useFetching(async () => {
        const response = await AnalyzeService.fetchPublicationsCountByTypes()
        if (response.data.success) {
            setTypesCount(response.data.data)
        }
    }, true)
    useEffect(() => {
        errFetching && console.log(errFetching);
    }, [errFetching])
    useEffect(() => {
        fetchTypeCount()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return <div
        style={{ width: width, height: height }}
    >
        {
            (!typesCount && isFetching)
                ? <MyFileLoader />
                : Object.keys(typesCount).map((el, index) =>
                    <Line
                        key={index}
                        width={width}
                        height={height}
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
                            labels: Object.keys(typesCount[el]),
                            datasets: [
                                {
                                    label: el,
                                    data: typesCount[el],
                                    borderColor: colors[index].line ? colors[index].line : colors[0].line,
                                    backgroundColor: colors[index].bg ? colors[index].bg : colors[0].bg,
                                }
                            ],
                        }} />
                )
        }
    </div>
}
PublicationsByType.defaultProps = {
    width: 440,
    height: 220
}

PublicationsByType.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}
export default PublicationsByType