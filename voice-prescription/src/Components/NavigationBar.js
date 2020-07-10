import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Prescription from "./Prescription";
import About from "./About";
import Home from "./Home";
import { Drawer, Button, Menu } from "antd";
import { HomeOutlined, UserDeleteOutlined, SmileOutlined , SettingOutlined, LoginOutlined, LockOutlined, GithubOutlined, FilePdfFilled, FilePdfOutlined } from '@ant-design/icons'
import renderEmpty from "antd/lib/config-provider/renderEmpty";
import Login from "./Login";
import Register from "./Register";
import history from '../history';

const { SubMenu } = Menu;

const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.access_token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    //localStorage.clear();
    // navigate to the home route
    //history.push('/home');
   //history.replace('./home');
    history.replace('/home');
    
}

const RightMenu = () =>{
  const [current, setCurrent] = useState("mail");
  const handleClick = (event) =>{
    setCurrent(event.key)
  }
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={current}
      mode="horizontal" 
      className = "rightMenu"
    >
        <Menu.Item key = "Home" icon = {<HomeOutlined />}>
            <Link to={"/"} className="nav-link">
                Home
            </Link>
        </Menu.Item>

          <Menu.Item key="Logout" icon={<LoginOutlined />} onClick={logout}>
           
                Logout
        </Menu.Item>

        <Menu.Item key = "Prescription" icon = {<FilePdfOutlined />}>
            <Link to={"/prescription"} className="nav-link">
                Prescription
            </Link>
        </Menu.Item>
      
        <Menu.Item key = "Register" icon = {<UserDeleteOutlined />}>
            <Link to={"/register"} className="nav-link">
                Register
            </Link>
        </Menu.Item>

        <Menu.Item key = "About us" icon = {<SmileOutlined />}>
            <Link to={"/about"} className="nav-link">
                About
            </Link>
        </Menu.Item>
        <Menu.Item key = "Github" icon = {<GithubOutlined />}>
        <a href="https://github.com/saipurnimag/didactic-happiness">Github</a>
        </Menu.Item>     
      
    </Menu>
  );
}



class Apptwo extends Component {
    state = {
        current: "mail",
        visible: false,
    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <Router>
                <nav className="menuBar">
                    <div className="logo" style={{ sm: 18, md: 8, lg: 8 }}>
                        <a href="">VoicePrescription</a>
                    </div>
                    <div className="menuCon">

                        <div className="rightMenu">
                            <RightMenu />
                        </div>
                        <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                            <span className="barsBtn"></span>
                        </Button>
                        <Drawer
                            title="Menu"
                            placement="right"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <Menu mode="vertical">
                                <Menu.Item key="Login" icon={<SettingOutlined />} title={"Login"}>
                                    <Link to={"/"} className="nav-link">
                                        Home
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="Prescription" icon={<FilePdfOutlined />} title="Prescription">
                                    <Link to={"/prescription"} className="nav-link">
                                        Prescription
                                </Link>

                                </Menu.Item>
                            </Menu>
                        </Drawer>
                    </div>
                </nav>
                <div>
                    
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/prescription" component={Prescription} />
                        <Route path="/about" component={About} />
                        <Route path="/login" component = {Login} />
                        <Route path="/register" component={Register}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Apptwo;
