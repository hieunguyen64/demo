import { useState } from "react";
import { TextField, Button, Box } from "@material-ui/core";
import Result from "./Result";
import axios from "axios";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [user, setUser] = useState({});

  const handleTextChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleSearchClick = async () => {
    if (!customerName) {
      alert('Vui lòng nhập tên khách hàng!')
    } else {
      const data = {name: customerName};

      await axios.post('http://localhost:5000/api/users/findByName', data)
        .then(response => {
          setIsResult(true);
          setUser(response.data.user)
        })
        .catch(error => {
          alert(error.response.data.msg)
        });
    }
  };

  const handleSaveClick = async () => {
    // Add save functionality here
    if (!customerName) {
      alert('Vui lòng nhập tên khách hàng!')
    } else {
      const data = {name: customerName};

      await axios.post('http://localhost:5000/api/users/add', data)
        .then(response => {
          alert(response.data)
          handleSearchClick()
        })
        .catch(error => {
          alert(error.response.data.msg)
        });
    }
  };

  return (
    <Box sx={{width: "100%"}}>
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Nhập tên khách hàng</h2>
        <TextField
          variant="outlined"
          placeholder="Nhập tên khách hàng"
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "20rem" }}
          value={customerName}
          onChange={handleTextChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem", minWidth: "8rem" }}
          onClick={handleSearchClick}
        >
          Tìm kiếm
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: "1rem", minWidth: "8rem" }}
          onClick={handleSaveClick}
        >
          Lưu tên khách hàng
        </Button>
      </form>
      {isResult && (
           <Result user={user} />
      )}
    </Box>
  );
}

export default App;