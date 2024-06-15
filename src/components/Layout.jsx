import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import userLogo from '../assets/images/user_image.jpg';
import logo from '../assets/images/logo.png';
import logoMini from '../assets/images/logo-mini.png';

function Layout() {
  const currentUser = useAuth();

  return (
    <>
      <div className="container-scroller">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a className="sidebar-brand brand-logo brand-logo-text" href="/dashboard">Codetrain</a>
            <a className="sidebar-brand brand-logo-mini brand-logo-text" href="/dashboard">Ct</a>
          </div>
          <ul className="nav">
            <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="count-indicator">
                    <img className="img-xs rounded-circle " src={userLogo} alt={currentUser.name + "Logo"}></img>
                    <span className="count bg-success"></span>
                  </div>
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">{currentUser.name}</h5>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item nav-category">
              <span className="nav-link">Navigation</span>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/dashboard">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/problems">
                <span className="menu-icon">
                  <i className="mdi mdi-xml"></i>
                </span>
                <span className="menu-title">Problems</span>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/about">
                <span className="menu-icon">
                  <i className="mdi mdi-information-outline"></i>
                </span>
                <span className="menu-title">About</span>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/contacts">
                <span className="menu-icon">
                  <i className="mdi mdi-contacts-outline"></i>
                </span>
                <span className="menu-title">Contacts</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid page-body-wrapper">
          <nav className="navbar p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
              <a className="sidebar-brand brand-logo-mini brand-logo-text" href="/dashboard">Ct</a>
            </div>
            <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-menu"></span>
              </button>
              <ul className="navbar-nav w-100">
                <li className="nav-item w-100">
                </li>
              </ul>
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown">
                  <a className="nav-link" id="profileDropdown" href="/profile" data-bs-toggle="dropdown">
                    <div className="navbar-profile">
                      <img className="img-xs rounded-circle " src={userLogo} alt={currentUser.name + "Logo"}></img>
                      <p className="mb-0 d-none d-sm-block navbar-profile-name">{currentUser.name}</p>
                      <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                    <a className="dropdown-item preview-item" href="/profile">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-alien text-success"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Profile</p>
                      </div>
                    </a> 
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item" onClick={() => currentUser.logOut()}>
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-logout text-danger"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Log out</p>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-format-line-spacing"></span>
              </button>
            </div>
          </nav>
          <div className="main-panel blank-page">
            <div className="content-wrapper">
               <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;
