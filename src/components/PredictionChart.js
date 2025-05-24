import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { fetchPredictionStats } from '../api/api';  // Assuming your API functions are in a separate file

const PredictionChart = () => {
    const [chartData, setChartData] = useState({ diabetic: 0, nonDiabetic: 0, weeklyPredictions: [] });

    useEffect(() => {
        // Fetch prediction stats from the backend API when the component mounts
        const fetchData = async () => {
            try {
                const data = await fetchPredictionStats(); // API call to fetch stats
                setChartData(data);  // Update state with fetched data
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData(); // Call fetchData function
    }, []);

    const COLORS = ['#FF6384', '#36A2EB'];

    return (
        <div>
            <h2 className='text-primary'>Diabetes Prediction Overview of Last seven days</h2>

            {/* 🟢 Pie Chart: Diabetic vs Non-Diabetic */}
            <PieChart width={400} height={400}>
                <Pie 
                    data={[
                        { name: 'Diabetic', value: chartData.diabetic }, 
                        { name: 'Non-Diabetic', value: chartData.nonDiabetic }
                    ]}
                    cx={200} 
                    cy={200} 
                    innerRadius={60} 
                    outerRadius={100} 
                    fill="#8884d8" 
                    paddingAngle={5} 
                    dataKey="value"
                >
                    {[{ name: 'Diabetic', value: chartData.diabetic }, { name: 'Non-Diabetic', value: chartData.nonDiabetic }]
                        .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                </Pie>
                <Tooltip />
            </PieChart>

            {/* 🟢 Line Chart: Predictions Over Time */}
            <h3>Predictions in the Last 7 Days</h3>
            <LineChart width={500} height={300} data={chartData.weeklyPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default PredictionChart;
