import { IconButton } from "@mui/material";
import WeatherChart from "./chart";
import styled from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import SelectionBar from "../SelectionBar";
import { fetchData } from "../../services/api-service";
import { DEFAULT_CITY, Day, Time, today } from "../../utils/constants";
import {
  filterTimeData,
  getDayFromDate,
  getNextDayOfWeek,
} from "../../utils/date-utils";

const ChartView: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTime, setSelectedTime] = useState(Time.Afternoon);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };
  const handleDayChange = (day: Day) => {
    setSelectedDay(day);
    setCurrentIndex(0);
  };
  const handleTimeChange = (time: Time) => {
    setSelectedTime(time);
  };

  const handlePrevChart = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNextChart = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await fetchData(selectedCity);
        setWeatherData(data);
      } catch (error) {
        setWeatherData(null);
        console.error("Failed to load weather data!", error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const thisWeekDay = getNextDayOfWeek(selectedDay, currentIndex);
  const nextWeekDay = getNextDayOfWeek(selectedDay, currentIndex + 1);

  const targetDayData = weatherData?.days?.find(
    (day: { datetime: string }) => day.datetime === thisWeekDay
  );
  const targetNextWeekDayData = weatherData?.days?.find(
    (day: { datetime: string }) => day.datetime === nextWeekDay
  );

  const targetTimeData = filterTimeData(targetDayData, selectedTime);
  const targetNextWeekTimeData = filterTimeData(
    targetNextWeekDayData,
    selectedTime
  );

  const prefixes: { [key: number]: string } = {
    0: "This",
    1: "Next",
    "-1": "Last",
  };

  const dayPrefix = prefixes[currentIndex] || "";
  const nextDayPrefix = prefixes[currentIndex + 1] || "";

  return (
    <ChartViewContainer>
      <SelectionBar
        onCityChange={handleCityChange}
        onDayChange={handleDayChange}
        onTimeChange={handleTimeChange}
        data={weatherData}
      />
      {weatherData ? (
        <BodyContainer>
          <IconButton
            style={{ height: "fit-content", left: 6 }}
            onClick={handlePrevChart}
          >
            <ArrowBackIos />
          </IconButton>
          <ChartContainer>
            <WeatherChart
              headerText={`${dayPrefix} ${selectedDay} the ${getDayFromDate(
                thisWeekDay
              )}`}
              data={targetTimeData}
            />
            <SmallScreen>
              <WeatherChart
                headerText={`${nextDayPrefix} ${selectedDay} the ${getDayFromDate(
                  nextWeekDay
                )}`}
                data={targetNextWeekTimeData}
              />
            </SmallScreen>
          </ChartContainer>
          <IconButton
            style={{ height: "fit-content" }}
            onClick={handleNextChart}
          >
            <ArrowForwardIos />
          </IconButton>
        </BodyContainer>
      ) : (
        <BodyContainer>
          <div style={{ paddingTop: 24 }}>
            No Data Available. Check that the city is spelled correctly.
          </div>
        </BodyContainer>
      )}
    </ChartViewContainer>
  );
};

export default ChartView;

const ChartViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  top: 96px;
  position: relative;
  min-height: 580px;
`;

const ChartContainer = styled.div`
  display: flex;
  width: 1050px;

  @media screen and (max-width: 1130px) {
    width: 500px;
  }

  @media screen and (max-width: 666px) {
    width: 325px;
  }
`;

const SmallScreen = styled.div`
  @media screen and (max-width: 1130px) {
    display: none;
  }
`;
