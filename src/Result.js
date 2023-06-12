import React, {useState} from 'react'
import { Button, Typography, Box } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DialogBuyProduct from './DialogBuyProduct';

const Result = ({ user,startDate,handleChangeDate, handleTurnOnReload }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isReload) => {
    if(isReload) {
      handleTurnOnReload()
    }
    setOpen(false);
  };


  React.useEffect(() => {
    setValue(user)
  }, [user])

  React.useEffect(() => {

    return () => {
      setOpen(false)
    }
  }, [])

  return (
    <div style={{ padding: "8px 32px"}}>
      {
        user && (
          <Box sx={{ display: 'flex', justifyContent: "space-between"}}>
            <div className='dateTimePicker'>
              <DatePicker
                open= {true}

                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => handleChangeDate(date)} />
            </div>
            <Box className='user__action'  sx={{display: 'flex', flexDirection: "column"}}>
              <Button variant="contained"
                color="primary" sx={{width: "200px", margin: "2px 0"}}
                onClick={handleClickOpen}
                >Mua hàng</Button>
              <Button variant="contained"
                color="primary" sx={{width: "200px", margin: "2px 0"}}>Mua điểm</Button>
            </Box>
            <div className="user__info">
              <Typography>Thông tin khách hàng: </Typography>
              <Typography>Tên KH: {value['name']}</Typography>
              <Typography>Số điểm tích lũy: {value['point']}</Typography>
              <Typography>Hạng: {value['rank']}</Typography>
            </div>
          </Box>
        )
      }
       <DialogBuyProduct
        startDate={startDate}
        user = {value}
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}

export default Result