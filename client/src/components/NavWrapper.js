import React from 'react';
import './NavWrapper.css';
import {Link} from 'react-router-dom';

export const NavWrapper = ({children}) => (
  <div>
    <div className="NavWrapper">
      <div className="NavWrapper_header">
        <div className="NavWrapper_container">
          <span className="NavWrapper_brand">
            <Link to="/">NetTest</Link>
          </span>
        </div>
      </div>

      <div className="NavWrapper_container">{children}</div>
    </div>
  </div>
);

export default NavWrapper;
