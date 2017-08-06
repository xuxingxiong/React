import React from 'react'
import { Table, Icon } from 'antd'

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch'

export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            selectedRowKeys: []
        }
    }

    // 获取数据
    getUserList = () => {
        fetch('http://127.0.0.1:8080/userInfo/userList', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                //body: JSON.stringify(postData)
            })
            .then((res) => { console.log(res.status); return res.json() })
            .then((data) => { 
                console.log(data.userList);
                this.setState({ userList: data.userList }) }
            )
            .catch((e) => { console.log(e.message) })
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
            dataIndex: 'state',
        }, {
            title: '操作',
            width: '20%',
            dataIndex: 'operate'
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