import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    PEST: '',
    source: '',
    SWOT: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/api/data');
    const data = await response.json();
    setData(data);
    setFilteredData(data);
  };

  const applyFilters = () => {
    let filtered = data;
    for (let key in filters) {
      if (filters[key]) {
        filtered = filtered.filter(item => item[key] === filters[key]);
      }
    }
    setFilteredData(filtered);
  };

  const renderChart = () => {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: filteredData.map(item => item.Country),
        datasets: [{
          label: 'Intensity',
          data: filteredData.map(item => item.Intensity),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <div>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
      <div>
        <label>End Year:</label>
        <input type="text" name="endYear" value={filters.endYear} onChange={handleFilterChange} />

        <label>Topics:</label>
        <input type="text" name="topics" value={filters.topics} onChange={handleFilterChange} />

        <label>Sector:</label>
        <input type="text" name="sector" value={filters.sector} onChange={handleFilterChange} />

        <label>Region:</label>
        <input type="text" name="region" value={filters.region} onChange={handleFilterChange} />

        <label>PEST:</label>
        <input type="text" name="PEST" value={filters.PEST} onChange={handleFilterChange} />

        <label>Source:</label>
        <input type="text" name="source" value={filters.source} onChange={handleFilterChange} />

        <label>SWOT:</label>
        <input type="text" name="SWOT" value={filters.SWOT} onChange={handleFilterChange} />

        <label>Country:</label>
        <input type="text" name="country" value={filters.country} onChange={handleFilterChange} />

        <label>City:</label>
        <input type="text" name="city" value={filters.city} onChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default Dashboard;
