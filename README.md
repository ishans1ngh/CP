# Weather Dashboard

A sophisticated weather application that provides personalized weather recommendations based on real-time weather data.

## Features

### Real-Time Weather Data
- Current weather conditions for any city worldwide
- 5-day weather forecast with detailed temperature ranges
- Live weather icons and dynamic background colors based on temperature
- Wind speed, humidity, UV index, and weather condition tracking

### Temperature-Based Suggestions
The app provides 5 practical suggestions based on current temperature ranges:
- Below 5°C: Extreme cold weather precautions and clothing
- 5°C to 10°C: Cold weather clothing and activity suggestions
- 10°C to 15°C: Cool weather recommendations
- 15°C to 20°C: Comfortable weather activity ideas
- 20°C to 25°C: Warm weather outdoor suggestions
- 25°C to 30°C: Hot weather safety and hydration tips
- Above 30°C: Extreme heat precautions and health warnings

### City Information
- Automatic city facts from Wikipedia
- City images and descriptions
- Geographic context

## Technology Stack

### Frontend
- Vanilla JavaScript with jQuery
- Moment.js for date formatting
- Animate.css for smooth animations
- Responsive design with glassmorphism effects

### APIs Used
- WeatherAPI for current weather data
- OpenWeatherMap for 5-day forecasts
- Wikipedia API for city information

## How It Works

1. User enters a city name or uses the default city
2. Weather data is fetched from multiple APIs
3. Current temperature is analyzed
4. 5 relevant suggestions are displayed based on the temperature range
5. City information and 5-day forecast are shown alongside

## Setup

1. Simply open index.html in a web browser
2. Or run the Python server: `python3 server.py`

## Suggestion System

The app uses a simple if-else logic to provide 5 practical suggestions for each temperature range:
- Each range covers specific clothing, activity, health, and safety recommendations
- Suggestions are displayed instantly without any external API calls
- All recommendations are based on common weather best practices