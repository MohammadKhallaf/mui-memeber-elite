import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

export default function CreateMemberPage(): React.ReactElement {

  
  return (
    <Paper
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <TextField size="small" label="Name" variant="outlined" />
      <TextField size="small" label="Email" type="email" variant="outlined" />
      <TextField size="small" label="Phone Number" variant="outlined" />
      <TextField size="small" label="ID" type="number" variant="outlined" />
      <TextField
        size="small"
        label="Address"
        variant="outlined"
        rows={4}
        multiline
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>{" "}
        <FormHelperText>fasdfsdf</FormHelperText>
      </FormControl>

      <FormControl >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Subscription Type"
          // onChange={handleChange}
        >
          <MenuItem value="basic">Basic</MenuItem>
          <MenuItem value="premium">Premium</MenuItem>
          <MenuItem value="vip">VIP</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
