import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { sortMoviesByRating , movieFilters } from "../../redux/slices/movies.slice";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const FilterBoxs = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movieLanguage } = useSelector((state: RootState) => state.movies )
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    dispatch(movieFilters({filterType: "language" , movieLanguage: e.target.value}))
    return;
  };
  
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        marginTop: 2,
        marginBottom: 2,
        justifyContent: "center",
        gap: "2%",
      }}
    >
      <div style={{ width: "40%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Languages</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={movieLanguage}
            label="Language"
            defaultValue={"en"}
            onChange={handleChangeLanguage}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"fr"}>French</MenuItem>
            <MenuItem value={"es"}>Spanish</MenuItem>
            <MenuItem value={"jp"}>Japaness</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ width: "40%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"10"}
            label="Release By Year"
            onChange={handleChangeLanguage}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          variant="outlined"
          sx={{ height: "100%" }}
          onClick={() => dispatch(sortMoviesByRating())}
        >
          Sort By Rating
        </Button>
      </div>
    </Box>
  );
};

export default FilterBoxs;
