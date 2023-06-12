import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { TextField, Box } from '@mui/material';
import axios from 'axios';



export default function DialogBuyProduct(props) {
  const { onClose, open, user, startDate } = props;
  const [price, setPrice] = React.useState(0);

  const handlePrice = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    setPrice(numericValue);
  };

  const handleClose = () => {
    onClose();
    setPrice(0);
  };

  const handleCancel = () => {
    handleClose()
  }

  const handleBuy = async() => {
    if (!price) {
      alert('Vui lòng nhập giá!')
    } else {
      const data = {
        id: user['id'],
        point: price * (1 / 100),
        price,
        startDate
      }

      await axios.post('http://localhost:3003/api/users/buyProduct', data)
        .then(response => {
          alert(response.data.msg)
          const isReload = true;
          onClose(isReload)
        })
        .catch(error => {
          alert(error.response.data.msg)
        });
    }
    setPrice(0)
  }

  React.useEffect(() => {

    return () => {
      setPrice(0)
    }
  }, [])


  return (
    <Dialog onClose={handleClose} open={open} maxWidth='lg'>
      <DialogTitle align='center' variant='h4'>Mua hàng</DialogTitle>
      <Box sx={{ width: '600px', padding: '4px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Nhập giá đơn hàng"
          style={{ marginBottom: "1rem", width: "50%", maxWidth: "20rem" }}
          value={price}
          InputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          onChange={handlePrice}
        />
        <Box>
          <Typography>Số tiền bạn mua: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</Typography>
          <Typography>Điểm đổi được: {price * (1 / 100)}</Typography>
        </Box>

      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <Button variant="contained"
            color="error" sx={{ width: "200px", margin: "4px" }}
            onClick={handleCancel}
          >Hủy</Button>
          <Button variant="contained"
            color="primary" sx={{ width: "200px", margin: "4px" }}
            onClick={handleBuy}
            >Xác nhận</Button>
        </Box>
    </Dialog>
  );
}

DialogBuyProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
