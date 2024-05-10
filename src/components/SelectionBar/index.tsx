import styled from "styled-components";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import AccessTime from "@mui/icons-material/AccessTime";
import LocationOn from "@mui/icons-material/LocationOn";
import {
  DEFAULT_CITY,
  Day,
  Time,
  daysOfWeek,
  timeOfDay,
} from "../../utils/constants";
import { useEffect, useState } from "react";

interface SelectionBarProps {
  onCityChange: (city: string) => void;
  onDayChange: (day: Day) => void;
  onTimeChange: (time: Time) => void;
  data?: { resolvedAddress: string };
}

const SelectionBar: React.FC<SelectionBarProps> = ({
  onCityChange,
  onDayChange,
  onTimeChange,
  data,
}) => {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);

  const handleCityInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedCity(event.target.value);
  };

  const handleCityInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onCityChange(selectedCity);
    }
  };

  useEffect(() => {
    if (data?.resolvedAddress) {
      setSelectedCity(data?.resolvedAddress);
    }
  }, [data?.resolvedAddress]);

  return (
    <SelectionBarContainer>
      <SelectContainer>
        <InputContainer>
          <LocationOn />
          <TextField
            size="small"
            style={{ marginLeft: 16 }}
            label="City"
            variant="outlined"
            value={selectedCity}
            onChange={handleCityInputChange}
            onKeyPress={handleCityInputKeyPress}
          />
        </InputContainer>
        <InputContainer>
          <AccessTime />
          <FormControl size="small" style={{ width: 140, marginLeft: 16 }}>
            <InputLabel id="day-label">Day</InputLabel>
            <Select
              labelId="day-label"
              label="Day"
              onChange={(event: SelectChangeEvent) =>
                onDayChange(event.target.value as Day)
              }
            >
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" style={{ width: 140, marginLeft: 16 }}>
            <InputLabel id="time-label">Time</InputLabel>
            <Select
              labelId="time-label"
              label="Time"
              onChange={(event: SelectChangeEvent) =>
                onTimeChange(event.target.value as Time)
              }
            >
              {timeOfDay.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputContainer>
      </SelectContainer>
      <Divider
        style={{
          width: 1000,
          borderColor: "black",
          borderWidth: 1,
          margin: "12px auto 0",
        }}
      />
    </SelectionBarContainer>
  );
};

export default SelectionBar;

const SelectionBarContainer = styled.div`
  position: fixed;
  background-color: white;
  z-index: 1;
  top: 74px;
  width: 100vw;

  @media screen and (max-width: 666px) {
    top: 50px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: auto;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
`;
