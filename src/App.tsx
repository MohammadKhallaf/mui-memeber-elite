/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

type Member = {
  id: number;
  name: string;
  email: string;
  membershipType: string;
  membershipStartDate: string;
  phoneNumber: string;
};
function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  // Define state for each filter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    membershipType: "",
    idNumber: "",
    membershipStartDate: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Fetch members and update state
    async function fetchMembers() {
      // Your fetch logic here
      const fetchedMembers: Member[] = []; // Placeholder for fetched members
      setMembers(fetchedMembers);
      setFilteredMembers(fetchedMembers);
    }

    fetchMembers();
  }, []);

  const handleDelete = async (_id: number) => {
    // Implement delete logic
  };

  // Function to update filters state
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to apply filters
  const applyFilters = () => {
    const filtered = members;
    // Filter logic here
    setFilteredMembers(filtered);
  };

  return (
    <Paper>
      <div>
        {/* Add filter inputs here, e.g., TextField for each filter */}
        <TextField label="Name" name="name" onChange={handleFilterChange} />
        {/* Add other filter TextFields here */}
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            {/* Add other headers here */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.id}</TableCell>
              <TableCell>{member.name}</TableCell>
              {/* Add other member details here */}
              <TableCell>
                <Link to={`/edit/${member.id}`}>Edit</Link>
                <Button onClick={() => handleDelete(member.id)}>Delete</Button>
                <Link to={`/show/${member.id}`}>Show</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
