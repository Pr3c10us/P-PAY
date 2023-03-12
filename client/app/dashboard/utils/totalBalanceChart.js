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

const TotalBalanceBarChart = () => {
    const [date, setDate] = useState([]);
    const [balanceValues, setBalanceValues] = useState([]);
    const [fillData, setFillData] = useState([]);
    const [balanceType, setBalanceType] = useState('week');

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}transfer/balance?type=${balanceType}`
        );
        let balances = await response.data.balances;

        const date = balances.map((balance, index) => {
            return balance.date;
        });

        setDate(date);

        setFillData(
            date.map((value, index) => {
                return { x: value, y: 0 };
            })
        );

        const balance = balances.map((balance, index) => {
            return balance.balance;
        });
        setBalanceValues(balance);
    };
    useEffect(() => {
        handleEffect();
    }, [balanceType]);

    const data = {
        labels: date,
        datasets: [
            {
                data: balanceValues,
                backgroundColor: '#54428E',
                borderColor: '#54428E',
                fill: 0,
                borderWidth: 3,
                pointBorderColor: 'white',
                pointBorderWidth: 0,
                tension: 0.4,
                radius: 6,
                pointRadius: 1,
                bezierCurve: false,
            },
            {
                data: fillData,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
                    gradient.addColorStop(0, 'rgb(84, 66, 142,0.4)');
                    gradient.addColorStop(1, 'rgb(256, 256, 256,0.4)');
                    return gradient;
                },
                fill: 0,
                borderColor: '#fff',
                borderWidth: 0,

                pointBorderColor: 'transparent',
                pointBorderWidth: 4,
                tension: 0,
                pointRadius: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        interaction: {
            intersect: false,
            // mode: 'index',
        },
        plugins: {
            legend: false,
            tooltip: {
                // backgroundColor: 'transparent',
                titleFont: {
                    size: '12',
                },
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                            }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
                titleColor: '#fff',
                bodyColor: '#fff',
                displayColors: false,
                filter: function (tooltipItem) {
                    return tooltipItem.datasetIndex === 0;
                },
            },
        },
        scales: {
            x: {
                border: { display: false },
                grid: {
                    display: false,
                },
                ticks: {
                    // display: false,
                    color: 'rgb(150,150,150)',
                    autoSkip: true,
                    maxTicksLimit: 7,
                },
                reverse: true,
            },
            y: {
                min: 50,
                border: { dash: [10, 4] },

                ticks: {
                    // display: false,
                    autoSkip: true,
                    maxTicksLimit: 8,
                    color: 'rgb(150,150,150)',
                    callback: (val) => {
                        let valArray = val.toLocaleString().split(',');
                        if (valArray.length !== 1) {
                            if (valArray.length > 3 && valArray.length <= 4) {
                                return '₦' + valArray[0] + 'M';
                            }
                            if (valArray.length > 2 && valArray.length <= 3) {
                                return '₦' + valArray[0] + 'M';
                            }
                            if (valArray.length <= 2) {
                                return '₦' + valArray[0] + 'k';
                            }
                        }
                        return valArray[0];
                    },
                },
                grid: {
                    // display: false,
                },
            },
        },
        beginAtZero: true,
    };
    return (
        <div className="flex h-min w-full max-w-2xl flex-col items-start justify-center gap-y-4 rounded-2xl border px-4 py-3">
            <div className="flex w-full items-center justify-between text-lg font-semibold">
                <h1 className=" text-secondary">Cash Flow</h1>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                    <button
                        onClick={() => setBalanceType('week')}
                        className={`w-10 rounded-lg ${
                            balanceType === 'week' &&
                            'border-secondary text-secondary'
                        } border-2 py-1 text-sm`}
                    >
                        1w
                    </button>
                    <button
                        onClick={() => setBalanceType('month')}
                        className={`w-10 rounded-lg ${
                            balanceType === 'month' &&
                            'border-secondary text-secondary'
                        } border-2 py-1 text-sm`}
                    >
                        1m
                    </button>
                    <button
                        onClick={() => setBalanceType('year')}
                        className={`w-10 rounded-lg ${
                            balanceType === 'year' &&
                            'border-secondary text-secondary'
                        } border-2 py-1 text-sm`}
                    >
                        1y
                    </button>
                </div>
            </div>
            <Line className="" data={data} options={options} />
        </div>
    );
};

export default TotalBalanceBarChart;
