import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';


function Layout() {
  const currentUser = useAuth();

  return (
    <>
      <div className="container-scroller">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a className="sidebar-brand brand-logo" href="#">
                      <button onClick={() => currentUser.logOut()} className="btn-submit">
          logout
        </button>
            </a>
            <a className="sidebar-brand brand-logo-mini" href="#">
                      <button onClick={() => currentUser.logOut()} className="btn-submit">
          logout
        </button>
            </a>
          </div>
          <ul className="nav">
            <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="count-indicator">
                    <span className="count bg-success"></span>
                  </div>
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">Henry Klein</h5>
                    <span>Gold Member</span>
                  </div>
                </div>
                <a href="#" id="profile-dropdown" data-bs-toggle="dropdown"><i className="mdi mdi-dots-vertical"></i></a>
                <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                  <a href="#" className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-cog text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                    </div>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item nav-category">
              <span className="nav-link">Navigation</span>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="../index.html">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer"></i>
                </span>
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop"></i>
                </span>
                <span className="menu-title">Basic UI Elements</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="ui-basic">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="../pages/ui-features/buttons.html">Buttons</a></li>
                  <li className="nav-item"> <a className="nav-link" href="../pages/ui-features/dropdowns.html">Dropdowns</a></li>
                  <li className="nav-item"> <a className="nav-link" href="../pages/ui-features/typography.html">Typography</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="../pages/forms/basic_elements.html">
                <span className="menu-icon">
                  <i className="mdi mdi-playlist-play"></i>
                </span>
                <span className="menu-title">Form Elements</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="../pages/tables/basic-table.html">
                <span className="menu-icon">
                  <i className="mdi mdi-table-large"></i>
                </span>
                <span className="menu-title">Tables</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="../pages/charts/chartjs.html">
                <span className="menu-icon">
                  <i className="mdi mdi-chart-bar"></i>
                </span>
                <span className="menu-title">Charts</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="../pages/icons/font-awesome.html">
                <span className="menu-icon">
                  <i className="mdi mdi-contacts"></i>
                </span>
                <span className="menu-title">Icons</span>
                <i className="menu-arrow"></i>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                <span className="menu-icon">
                  <i className="mdi mdi-security"></i>
                </span>
                <span className="menu-title">User Pages</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="auth">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="../pages/samples/login.html"> Login </a></li>
                  <li className="nav-item"> <a className="nav-link" href="../pages/samples/register.html"> Register </a></li>
                  <li className="nav-item"> <a className="nav-link" href="../pages/samples/error-404.html"> 404 </a></li>
                  <li className="nav-item"> <a className="nav-link" href="../pages/samples/error-500.html"> 505 </a></li>
                  <li className="nav-item"> <a className="nav-link" href="../pages/samples/blank-page.html"> Blank Page </a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="../docs/documentation.html">
                <span className="menu-icon">
                  <i className="mdi mdi-file-document"></i>
                </span>
                <span className="menu-title">Documentation</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid page-body-wrapper">
          <nav className="navbar p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
              <a className="navbar-brand brand-logo-mini" href="../index.html"></a>
            </div>
            <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-menu"></span>
              </button>
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown d-none d-lg-block">
                  <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-bs-toggle="dropdown" aria-expanded="false" href="#">+ Create New Project</a>
                  <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
                    <h6 className="p-3 mb-0">Projects</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-file-outline text-primary"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Software Development</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-web text-info"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">UI Development</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-layers text-danger"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Software Testing</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <p className="p-3 mb-0 text-center">See all projects</p>
                  </div>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                  <a className="nav-link" href="#">
                    <i className="mdi mdi-view-grid"></i>
                  </a>
                </li>
                <li className="nav-item dropdown border-left">
                  <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-email"></i>
                    <span className="count bg-success"></span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Messages</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Mark send you a message</p>
                        <p className="text-muted mb-0"> 1 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Cregh send you a message</p>
                        <p className="text-muted mb-0"> 15 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Profile picture updated</p>
                        <p className="text-muted mb-0"> 18 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <p className="p-3 mb-0 text-center">4 new messages</p>
                  </div>
                </li>
                <li className="nav-item dropdown border-left">
                  <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                    <i className="mdi mdi-bell"></i>
                    <span className="count bg-danger"></span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Notifications</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-calendar text-success"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Event today</p>
                        <p className="text-muted ellipsis mb-0"> Just a reminder that you have an event today </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-cog text-danger"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Settings</p>
                        <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-link-variant text-warning"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Launch Admin</p>
                        <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <p className="p-3 mb-0 text-center">See all notifications</p>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                    <div className="navbar-profile">
                      <p className="mb-0 d-none d-sm-block navbar-profile-name">Henry Klein</p>
                      <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                    <h6 className="p-3 mb-0">Profile</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-cog text-success"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Settings</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-logout text-danger"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Log out</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <p className="p-3 mb-0 text-center">Advanced settings</p>
                  </div>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-format-line-spacing"></span>
              </button>
            </div>
          </nav>
          <div className="main-panel">
            <div className="content-wrapper blank-page">
               <Outlet />
            </div>
          </div>
        </div>
      </div>
      <script src="../assets/vendors/js/vendor.bundle.base.js"></script>
      <script src="../assets/vendors/progressbar.js/progressbar.min.js"></script>
      <script src="../assets/vendors/jvectormap/jquery-jvectormap.min.js"></script>
      <script src="../assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
      <script src="../assets/js/off-canvas.js"></script>
      <script src="../assets/js/misc.js"></script>
      <script src="../assets/js/settings.js"></script>
      <script src="../assets/js/todolist.js"></script>
      <script src="../assets/js/dashboard.js"></script>
    </>
  )
}

export default Layout;
