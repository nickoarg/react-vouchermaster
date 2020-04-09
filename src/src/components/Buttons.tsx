import * as React from 'react';

interface IButtonsProps {
  login: () => void;
  getUser: () => void;
  callApi: (endpoint: string) => void;
  renewToken: () => void;
  logout: () => void;
}

const Buttons: React.SFC<IButtonsProps> = props => {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        <button className="btn btn-primary btn-login" style={{ margin: '10px' }} onClick={props.login}>
          Login
        </button>
        <button className="btn btn-secondary btn-getapi" style={{ margin: '10px' }} onClick={() => props.callApi('users/')}>
          Get User API Backend
        </button>
        <button className="btn btn-secondary btn-getapi" style={{ margin: '10px' }} onClick={() => props.callApi('protected/')}>
          Call Secure API
        </button>
        <button className="btn btn-success btn-renewtoken" style={{ margin: '10px' }} onClick={props.renewToken}>
          Renew Token
        </button>
        <button className="btn btn-dark btn-logout" style={{ margin: '10px' }} onClick={props.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Buttons;
