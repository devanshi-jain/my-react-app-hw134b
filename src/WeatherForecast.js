// WeatherForecast.js
import React, { useState, useEffect } from 'react';

const WeatherForecast = () => {
    const [temperature, setTemperature] = useState('--');
    const [conditions, setConditions] = useState('---');
    const [iconUrl, setIconUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = 'gPgFPBVAhGgA4XHrR58HtJ8RYuGR0rKG';
            const locationKey = '347628';
            const currentConditionsUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

            try {
                const response = await fetch(currentConditionsUrl);

                if (response.ok) {
                    const data = await response.json();

                    const temperatureValue = data[0].Temperature.Imperial.Value;
                    const conditionsValue = data[0].WeatherText;
                    const iconValue = data[0].WeatherIcon;

                    setTemperature(`${temperatureValue}°F`);
                    setConditions(conditionsValue);
                    setIconUrl(`https://developer.accuweather.com/sites/default/files/${iconValue < 10 ? '0' + iconValue : iconValue}-s.png`);
                } else {
                    console.error('Error fetching current conditions:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching current conditions:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="weather-info">
            <h1>Weather Forecast</h1>
            <img src={iconUrl} alt="Weather Icon" />
            <div className="temperature">
                <span className="temp-celsius">{temperature}</span>
            </div>
            <p className="weather-condition">{conditions}</p>
        </div>
    );
};

export default WeatherForecast;
