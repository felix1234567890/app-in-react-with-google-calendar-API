import { toast, Zoom } from 'react-toastify';
export default {
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT,
  hideProgressBar: true,
  transition: Zoom,
  style: { textAlign: 'center' }
};
