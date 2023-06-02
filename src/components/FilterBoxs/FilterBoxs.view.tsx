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
import ArrowUpwardIcon  from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const FilterBoxs = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movieLanguage , yearOfRelease , order} = useSelector((state: RootState) => state.movies )
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    dispatch(movieFilters({filterType: "language" , movieLanguage: e.target.value}))
    return null;
  };
  
const handleChangeYearOfRelease = (e: SelectChangeEvent) =>{
  dispatch(movieFilters({filterType: "year_of_release" , yearOfRelease: e.target.value}))
    return null;
}

const Orderpayload = order === 'as' ? {order: 'de'} : {order: 'as'}

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
      role = 'mainfilterbox'
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
            <MenuItem value={"all"}>All Languages</MenuItem>
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"fr"}>French</MenuItem>
            <MenuItem value={"es"}>Spanish</MenuItem>
            <MenuItem value={"ja"}>Japaness</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ width: "40%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Release By Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearOfRelease}
            defaultValue={"2010"}
            label="Release By Year"
            onChange={handleChangeYearOfRelease}
          >
            <MenuItem value={"all_years"}>All Years</MenuItem>
            <MenuItem value={"2010"}>2010</MenuItem>
            <MenuItem value={"2011"}>2011</MenuItem>
            <MenuItem value={"2012"}>2012</MenuItem>
            <MenuItem value={"2013"}>2013</MenuItem>
            <MenuItem value={"2014"}>2014</MenuItem>
            <MenuItem value={"2022"}>2022</MenuItem>
            <MenuItem value={"2023"}>2023</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          variant="outlined"
          sx={{ height: "100%" }}
          onClick={() => dispatch(sortMoviesByRating(Orderpayload))}
        >
          Sort By Rating {order === "as" ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
        </Button>
      </div>
    </Box>
  );
};

export default FilterBoxs;


// mongoPass: l1Oy1aenadgUBnOp
// mongoUser: robinsaini

// url: mongodb+srv://robinsaini:<password>@cluster0.a48iaxt.mongodb.net/?retryWrites=true&w=majority

// mongodb+srv://robinsaini:<l1Oy1aenadgUBnOp>@cluster0.a48iaxt.mongodb.net/?retryWrites=true&w=majority