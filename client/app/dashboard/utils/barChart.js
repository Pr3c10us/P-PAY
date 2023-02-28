import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Filler
);

const BalanceBarChart = () => {
    const [date, setDate] = useState([]);
    const [balanceValues, setBalanceValues] = useState([]);
    const [fillData, setFillData] = useState([]);

    const handleEffect = async (req, res) => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}transfer/balance`
        );
        let balances = await response.data.balances;

        const date = balances.slice(0, 7).map((balance, index) => {
            return balance.date;
        });
        setDate(date);

        setFillData(
            date.map((value, index) => {
                return { x: value, y: 0 };
            })
        );

        const balance = balances.slice(0, 7).map((balance, index) => {
            return balance.balance;
        });
        setBalanceValues(balance);
    };
    useEffect(() => {
        handleEffect();
    }, []);

    const data = {
        labels: date,
        datasets: [
            {
                data: balanceValues,
                backgroundColor: '#fff',
                borderColor: '#fff',
                borderWidth: 2,
                pointBorderColor: 'transparent',
                pointBorderWidth: 4,
                tension: 0,
                pointRadius: 1,
            },
        ],
    };

    const options = {
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: false,
            tooltip: {
                backgroundColor: 'transparent',
                titleFont: {
                    size: '10',
                },
                displayColors: false,
            },
        },
        scales: {
            x: {
                border: { display: false },
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                reverse: true,
            },
            y: {
                min: 100,
                border: { display: false },

                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        },
        beginAtZero: true,
    };
    return (
        <div className="justify-right flex h-min w-full max-w-[11rem] items-end">
            <Line className="h-20 w-20" data={data} options={options} />
        </div>
    );
};

export default BalanceBarChart;
