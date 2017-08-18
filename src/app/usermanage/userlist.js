import React from 'react'
import {Button, Table, Icon } from 'antd'

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch'

export default class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            selectedRowKeys: []
        }
    }

    // 获取数据
    getUserList = () => {
        fetch('../../../userlist.json')
            .then((res) => { console.log(res.status); return res.json() })
            .then((data) => { 
                console.log(data.userList);

                this.setState({ userList: data.userList }) }
            )
            .catch((e) => { console.log(e.message) })
    }

    deleteClick = (data) => {
        console.log(data);
    }

    componentDidMount() {
        this.getUserList();
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const columns = [{
            title: '用户名',
            width: '20%',
            dataIndex: 'username'
        }, {
            title: '姓名',
            width: '20%',
            dataIndex: 'name'
        }, {
            title: '状态',
            width: '20%',
            render: state => {return state==1?'有效':'无效'},
            dataIndex: 'state',
        }, {
            title: '操作',
            width: '20%',
            dataIndex: 'operate',
            render: (text,data,index) =>  <Button onClick={this.deleteClick.bind(this,data)}>删除</Button>
        }]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const pagination = {
            total: this.state.userList.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return ( <Table rowSelection = { rowSelection } columns = { columns } dataSource = { this.state.userList } 
            bordered pagination = { pagination } />
        )
    }
}