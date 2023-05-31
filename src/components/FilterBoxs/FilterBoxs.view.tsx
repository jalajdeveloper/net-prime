import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Button,
  } from "@mui/material";
  import { SelectChangeEvent } from "@mui/material/Select";

const FilterBoxs = () => {

    const handleChange = (e: SelectChangeEvent) => {
        console.log(e.target.value);
    
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
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"10"}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
        <Button variant="outlined" sx={{height: "100%"}}>Sort By Rating</Button>
    </div>
  </Box>
  )
}

export default FilterBoxs