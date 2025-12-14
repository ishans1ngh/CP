/*
  # Weather Recommendations Schema

  1. New Tables
    - `weather_recommendations`
      - `id` (uuid, primary key) - Unique identifier for each recommendation
      - `city` (text) - City name
      - `temperature` (numeric) - Temperature in Celsius
      - `humidity` (numeric) - Humidity percentage
      - `wind_speed` (numeric) - Wind speed in km/h
      - `uv_index` (numeric) - UV index value
      - `weather_condition` (text) - Weather condition description
      - `ai_recommendation` (text) - AI-generated recommendation
      - `created_at` (timestamptz) - When the recommendation was generated
  
  2. Security
    - Enable RLS on `weather_recommendations` table
    - Add policy for public read access (weather data is public information)
    - Add policy for inserting recommendations
*/

CREATE TABLE IF NOT EXISTS weather_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  temperature numeric NOT NULL,
  humidity numeric,
  wind_speed numeric,
  uv_index numeric,
  weather_condition text,
  ai_recommendation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE weather_recommendations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read weather recommendations
CREATE POLICY "Anyone can read weather recommendations"
  ON weather_recommendations
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert recommendations (from edge function)
CREATE POLICY "Anyone can insert weather recommendations"
  ON weather_recommendations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for faster city lookups
CREATE INDEX IF NOT EXISTS idx_weather_recommendations_city ON weather_recommendations(city);
CREATE INDEX IF NOT EXISTS idx_weather_recommendations_created_at ON weather_recommendations(created_at DESC);
