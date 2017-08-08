/**
 * @authors xuxx
 * @date    2017-08-08
 * @description 主入口模块
 */
import React from 'react'
import { render } from 'react-dom'
// 引入react-router-dom模块
import { BrowserRouter, Route, Link} from 'react-router-dom'
// 引入Antd的导航组件
import { Layout, Breadcrumb, Menu, Icon, Switch } from 'antd'
import 'whatwg-fetch'

// 引入Ant-Design样式 & Animate.CSS样式
import 'font-awesome/css/font-awesome.min.css'

// 引入主体样式文件
import './main.css'

// 引入单个页面（包括嵌套的子页面）
import MyTable from './src/table.js'

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

// 配置导航
class LayoutApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            breadcrumbCount: [],
            breadcrumb: '用户管理/表格',
            username: ''
        }
    }

    // 获取数据
    fetchFn = () => {
        fetch('../breadcrumb.json')
            .then((res) => { console.log(res.status);return res.json() })
            .then((data) => { 
                this.setState({
                    breadcrumbCount:data.breadcrumb
                }) 
            })
            .catch((e) => { console.log(e.message) })
    }

    handleClick = (e) => {
        this.state.breadcrumbCount.map((item) => {
            if(item.key == e.key) {
                this.setState({
                    breadcrumb: item.value
                })
            }
        });
    }

    componentDidMount() {
        this.getUser();
        this.fetchFn();
    }

    getUser = () => {
        this.setState({
            username: 'xuxx'
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Layout> 
                    <Header className="header" style={{ position: 'fixed', width: '100%', zIndex: 10000 }}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>

                            <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                                <Menu.Item key="setting:1">退出</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Layout style={{ padding: '0 50px', marginTop: 64 }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                            mode="inline"
                            defaultSelectedKeys={['100']}
                            defaultOpenKeys={['UserManage']}
                            onClick={this.handleClick.bind(this)}
                            style={{ height: '100%', borderRight: 0 }}
                            >
                            <SubMenu key="UserManage" title={<span><Icon type="user" />用户管理</span>}>
                                <Menu.Item key="100"><Link to="/">表格</Link></Menu.Item>
                                <Menu.Item key="101">option2</Menu.Item>
                                <Menu.Item key="102">option3</Menu.Item>
                                <Menu.Item key="103">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                <Menu.Item key="200">option5</Menu.Item>
                                <Menu.Item key="201">option6</Menu.Item>
                                <Menu.Item key="202">option7</Menu.Item>
                                <Menu.Item key="203">option8</Menu.Item>
                            </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 10px 24px' }}>
                            <Breadcrumb style={{ margin: '12px 0'}}>
                                <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 500 }}>
                                <Route exact path="/" component={MyTable} />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}

render((<LayoutApp />), document.getElementById('app'));


