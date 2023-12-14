"use client";
import {
  GetWeatherErrorResponse,
  GetWeatherResponse,
  HistoryRecord,
  SearchInput,
  Weather,
  defaultSearchInput,
  defaultWeather,
  formatDateTime,
} from "@/components/HomePage/HomePageModel";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Button,
  Container,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function HomePage() {
  const [searchInput, setSearchInput] =
    useState<SearchInput>(defaultSearchInput);
  const [weather, setWeather] = useState<Weather>(defaultWeather);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [error, setError] = useState<string>("");

  function change(event: any) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setSearchInput({
      ...searchInput,
      [name]: value,
    });
  }

  function clear() {
    setSearchInput(defaultSearchInput);
    setWeather(defaultWeather);
  }

  function remove(index: number) {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  }

  async function search(input: SearchInput) {
    if (!input.city && !input.country)
      return setError("Please input City or Country");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.city},${input.country}&APPID=${process.env.NEXT_PUBLIC_API_KEY}`;
    const rawResponse = await fetch(url);

    if (!rawResponse.ok) {
      const response: GetWeatherErrorResponse = await rawResponse.json();
      const message =
        response.message === "city not found" ? "Not found" : response.message;
      return setError(message);
    }

    const response: GetWeatherResponse = await rawResponse.json();
    const weatherItem = response.weather[0];
    const newWeather: Weather = {
      ...defaultWeather,
      description: weatherItem.description,
      main: weatherItem.main,
      city: response.name,
      country: response.sys.country,
      minTemperature: response.main.temp_min,
      maxTemperature: response.main.temp_max,
      humidity: response.main.humidity,
      date: new Date(),
    };
    setWeather(newWeather);
    const newHistory = [
      {
        city: newWeather.city,
        country: newWeather.country,
        date: newWeather.date,
      },
      ...history,
    ];
    setHistory(newHistory);
    setError("");
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
        Today's Weather
      </Typography>
      <Divider sx={{ bgcolor: "black" }} />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <InputLabel
            id="city"
            sx={{ width: { xs: "70px", md: "auto", color: "black" } }}
          >
            City:
          </InputLabel>
          <FormControl>
            <TextField
              id="city"
              name="city"
              size="small"
              value={searchInput.city}
              onChange={change}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <InputLabel
            id="country"
            sx={{ width: { xs: "70px", md: "auto", color: "black" } }}
          >
            Country:
          </InputLabel>
          <FormControl>
            <TextField
              id="country"
              name="country"
              size="small"
              value={searchInput.country}
              onChange={change}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ pt: { xs: 1, sm: 0 } }}>
          <Button variant="contained" onClick={() => search(searchInput)}>
            Search
          </Button>
          <Button variant="contained" onClick={clear}>
            Clear
          </Button>
        </Stack>
      </Stack>
      {error && (
        <Alert severity="error" icon={false} sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {weather.city && (
        <Stack direction="column" sx={{ mt: 4 }}>
          <Typography sx={{ color: "dimgrey" }}>
            {weather.city},&nbsp;{weather.country}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {weather.main}
          </Typography>
          <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
            <Stack direction="column" sx={{ color: "dimgrey" }}>
              <Typography>Description:</Typography>
              <Typography>Temperature:</Typography>
              <Typography>Humidity:</Typography>
              <Typography>Time:</Typography>
            </Stack>
            <Stack direction="column">
              <Typography>{weather.description}</Typography>
              <Typography>
                {weather.minTemperature}&deg;C&nbsp;~&nbsp;
                {weather.maxTemperature}&deg;C
              </Typography>
              <Typography>{weather.humidity}%</Typography>
              <Typography>
                {formatDateTime(weather.date, "YYYY-MM-DD HH:mm A")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
        Search History
      </Typography>
      <Divider sx={{ bgcolor: "black" }} />
      {history.length === 0 && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100px" }}
        >
          <Typography>No Record</Typography>
        </Stack>
      )}
      {history.length > 0 && (
        <Stack direction="column" sx={{ mb: 4 }}>
          {history.map((row, index) => (
            <Box key={index}>
              <Stack
                key={index}
                sx={{ mt: 2, mb: 1 }}
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent={{ sm: "space-between" }}
              >
                <Typography>
                  {index + 1}. {row.city},&nbsp;{row.country}
                </Typography>
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>
                    {formatDateTime(row.date, "HH:mm:ss A")}
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <Fab
                      size="small"
                      onClick={() =>
                        search({
                          city: row.city,
                          country: row.country,
                        })
                      }
                      sx={{ boxShadow: "none" }}
                    >
                      <SearchIcon />
                    </Fab>
                    <Fab
                      size="small"
                      onClick={() => remove(index)}
                      sx={{ boxShadow: "none" }}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Stack>
                </Stack>
              </Stack>
              <Divider />
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
}
