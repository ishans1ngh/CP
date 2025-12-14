import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WeatherData {
  city: string;
  temperature: number;
  humidity?: number;
  wind_speed?: number;
  uv_index?: number;
  weather_condition?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const weatherData: WeatherData = await req.json();

    // Validate required fields
    if (!weatherData.city || weatherData.temperature === undefined) {
      return new Response(
        JSON.stringify({ error: "City and temperature are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate AI recommendation using Claude
    const aiRecommendation = await generateAIRecommendation(weatherData);

    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data, error } = await supabase
      .from("weather_recommendations")
      .insert({
        city: weatherData.city,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        wind_speed: weatherData.wind_speed,
        uv_index: weatherData.uv_index,
        weather_condition: weatherData.weather_condition,
        ai_recommendation: aiRecommendation,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
    }

    return new Response(
      JSON.stringify({
        success: true,
        recommendation: aiRecommendation,
        data: data,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function generateAIRecommendation(
  weatherData: WeatherData
): Promise<string> {
  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");

  if (!anthropicApiKey) {
    // Fallback to rule-based recommendations if no API key
    return generateRuleBasedRecommendation(weatherData);
  }

  const prompt = `You are a helpful weather assistant providing personalized recommendations. Analyze the following weather data and provide practical, friendly advice:

Location: ${weatherData.city}
Temperature: ${weatherData.temperature}°C
Humidity: ${weatherData.humidity || "N/A"}%
Wind Speed: ${weatherData.wind_speed || "N/A"} km/h
UV Index: ${weatherData.uv_index || "N/A"}
Condition: ${weatherData.weather_condition || "N/A"}

Provide 3-4 personalized recommendations covering:
1. Clothing suggestions
2. Activity recommendations
3. Health and safety tips
4. Any special precautions

Keep the response concise, friendly, and practical (max 150 words).`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", await response.text());
      return generateRuleBasedRecommendation(weatherData);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return generateRuleBasedRecommendation(weatherData);
  }
}

function generateRuleBasedRecommendation(weatherData: WeatherData): string {
  const temp = weatherData.temperature;
  const humidity = weatherData.humidity || 50;
  const windSpeed = weatherData.wind_speed || 0;
  const uvIndex = weatherData.uv_index || 0;

  let recommendations: string[] = [];

  // Temperature-based clothing
  if (temp < 0) {
    recommendations.push("Layer up with heavy winter coat, gloves, and warm hat.");
  } else if (temp < 10) {
    recommendations.push("Wear a jacket and long sleeves to stay warm.");
  } else if (temp < 20) {
    recommendations.push("Light jacket recommended, perfect for outdoor activities.");
  } else if (temp < 30) {
    recommendations.push("Comfortable weather! Light clothing works well.");
  } else {
    recommendations.push("Stay cool with light, breathable clothing.");
  }

  // Humidity considerations
  if (humidity > 80) {
    recommendations.push("High humidity may feel uncomfortable. Stay hydrated.");
  }

  // Wind considerations
  if (windSpeed > 30) {
    recommendations.push("Strong winds expected. Secure loose items.");
  }

  // UV protection
  if (uvIndex > 7) {
    recommendations.push("High UV index! Apply sunscreen and wear sunglasses.");
  } else if (uvIndex > 3) {
    recommendations.push("Moderate UV levels. Consider sun protection.");
  }

  // Heat safety
  if (temp > 35) {
    recommendations.push("Extreme heat! Limit outdoor exposure and stay hydrated.");
  }

  return recommendations.slice(0, 4).join(" ");
}
