import React from 'react';
import { ReactComponent as Google } from '../helpers/GoogleSVG.svg';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/loginActions';

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
  hideProgressBar: true,
  transition: Zoom
});
const Login = ({ history }) => {
  const dispatch = useDispatch();
  const handleAuthClick = () => {
    if (window['gapi']) {
      window['gapi'].auth2
        .getAuthInstance()
        .signIn()
        .then(res => {
          const name = res.w3.ig;
          const imageUrl = res.w3.Paa;
          dispatch(setUser(name, imageUrl));
          history.push('/');
        })
        .catch(err => {
          switch (err.error) {
            case 'popup_closed_by_user':
              toast.error('Morate se ulogirati da biste vidjeli vaše događaje');
              break;
            case 'access_denied':
              toast.error(
                'Morate dati svoj pristanak da biste vidjeli vaše događaje'
              );
              break;
            default:
              toast.error('Pojavila se pogreška.Pokušajte ponovo');
          }
        });
    } else {
      toast.error('Error: gapi not loaded');
    }
  };
  return (
    <div className="container">
      <a className="google-button" onClick={handleAuthClick}>
        <div
          style={{
            marginRight: 10,
            background: '#fff',
            padding: 10,
            borderRadius: 2
          }}
        >
          <Google />
        </div>
        <span
          style={{
            paddingRight: 10,
            fontWeight: 500,
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          Sign in with Google
        </span>
      </a>
    </div>
  );
};

export default Login;
