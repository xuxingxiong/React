import React from 'react'
import { Table, Icon } from 'antd'

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch'

export default class RoleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roleList: [],
            selectedRowKeys: []
        }
    }

    // 获取数据
    getRoleList = () => {
        fetch('http://127.0.0.1:8080/roleInfo/roleList', {
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
                console.log(data.roleList);
                this.setState({ roleList: data.roleList }) }
            )
            .catch((e) => { console.log(e.message) })
    }

    componentDidMount() {
        this.getRoleList();
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const columns = [{
            title: '角色名称',
            width: '20%',
            dataIndex: 'role'
        }, {
            title: '描述',
            width: '20%',
            dataIndex: 'description'
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
            total: this.state.roleList.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return ( <Table rowSelection = { rowSelection } columns = { columns } dataSource = { this.state.roleList } 
            bordered pagination = { pagination } />
        )
    }
}