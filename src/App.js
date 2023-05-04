import { useState } from "react";
import { TextField, Button } from "@material-ui/core";

function App() {
  const [customerName, setCustomerName] = useState("");

  const handleTextChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleSearchClick = () => {
    // Add search functionality here
  };

  const handleSaveClick = () => {
    // Add save functionality here
  };

  return (
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
  );
}

export default App;