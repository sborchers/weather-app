import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
} from "recharts";
import {
  WiDaySunny,
  WiCloudy,
  WiStrongWind,
  WiRaindrops,
  WiDaySunnyOvercast,
  WiDayWindy,
  WiRain,
  WiCloudyGusts,
  WiDayCloudy,
} from "weather-icons-react";
import styled, { keyframes } from "styled-components";
import { convertTo12HourFormat } from "../../utils/date-utils";

interface WeatherChartProps {
  headerText: string;
  data: {
    datetime: string;
    temp: number;
    windspeed: number;
    precipprob: number;
    conditions: string;
  }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ headerText, data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 666);

  const getWeatherIcon = (description?: string) => {
    const message = description?.toLowerCase();

    if (message?.includes("sun") && message?.includes("cloud")) {
      return <WiDaySunnyOvercast size={120} color="orange" />;
    } else if (message?.includes("sun") && message?.includes("wind")) {
      return <WiDayWindy size={120} color="orange" />;
    } else if (message?.includes("cloud") && message?.includes("rain")) {
      return <WiRain size={120} color="orange" />;
    } else if (message?.includes("cloud") && message?.includes("wind")) {
      return <WiCloudyGusts size={120} color="orange" />;
    } else {
      if (message?.includes("sun") || message?.includes("clear")) {
        return <RotatingSun size={120} />;
      } else if (message?.includes("cloud")) {
        return <WiCloudy size={120} color="orange" />;
      } else if (message?.includes("wind")) {
        return <WiStrongWind size={120} color="orange" />;
      } else if (message?.includes("rain")) {
        return <WiRaindrops size={120} color="orange" />;
      } else {
        return <WiDayCloudy size={120} color="orange" />;
      }
    }
  };

  // Data points at middle of time range
  const midPtData = data ? data[Math.floor(data.length / 2)] : null;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 666);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WeatherChartContainer>
      <h1>{headerText}</h1>
      {data ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>{getWeatherIcon(midPtData?.conditions)}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <body>{`${midPtData?.conditions} ${midPtData?.temp}º F`}</body>
              <small style={{ alignItems: "center", display: "flex" }}>
                <WiStrongWind size={48} color="orange" />
                {midPtData?.windspeed === 0
                  ? "No wind"
                  : `Winds ${midPtData?.windspeed} mph`}
              </small>
              <small style={{ alignItems: "center", display: "flex" }}>
                <WiRaindrops size={48} color="orange" />
                {midPtData?.precipprob === 0
                  ? "No rain"
                  : `
          ${midPtData?.precipprob}% chance rain`}
              </small>
            </div>
          </div>
          <LineChart
            width={isSmallScreen ? 325 : 500}
            height={isSmallScreen ? 300 : 350}
            data={data}
          >
            <XAxis
              dataKey="datetime"
              tickFormatter={(time: string) => convertTo12HourFormat(time)}
            >
              <Label value="Time" offset={-15} position="insideBottom" />
            </XAxis>
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            {data?.length > 6 && (
              <>
                <ReferenceLine
                  x={data[2]?.datetime}
                  stroke="black"
                  strokeDasharray="5 5"
                />
                <ReferenceLine
                  x={data[6]?.datetime}
                  stroke="black"
                  strokeDasharray="5 5"
                />
              </>
            )}
            <Line
              name="Temp (º F)"
              type="monotone"
              dataKey="temp"
              stroke="orange"
            />
            <Line
              name="Wind Speed (mph)"
              type="monotone"
              dataKey="windspeed"
              stroke="#82ca9d"
            />
            <Line
              name="Chance of Rain (%)"
              type="monotone"
              dataKey="precipprob"
              stroke="#8884d8"
            />
            <Tooltip
              labelFormatter={(time: string) => convertTo12HourFormat(time)}
            />
            <Legend wrapperStyle={{ bottom: -20 }} />
          </LineChart>
        </>
      ) : (
        <div>No Data Available for this Date.</div>
      )}
    </WeatherChartContainer>
  );
};

export default WeatherChart;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingSun = styled(WiDaySunny)`
  animation: ${rotateAnimation} 25s linear infinite;
  color: orange;
`;

const WeatherChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;
