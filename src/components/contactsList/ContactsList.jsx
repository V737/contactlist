import React, { Component } from "react";
import Table from "antd/lib/table";

import ContactActions from "../../actions/contactActions";

import 'antd/lib/table/style/css';
import './contactsList.scss';
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {defaultCurrent: this.props.pageNumber, pageSize: 25},
      loading: false,
    }
  }

  columns = [{
    title: "Name",
    dataIndex: "displayName",
    key: "displayName"
  },{
    title: "Phone Number",
    dataIndex: "phoneNumbers[0].number",
    key: "phoneNumber"
  },{
    title: "EMail Id",
    dataIndex: "emails[0].email",
    key: "emailId"
  }];

  fetchContacts = () => {
    this.setState({loading: true});
    const pageNumber = this.state.pagination.current || this.state.pagination.defaultCurrent;
    return ContactActions.listContacts(this.props.authToken, pageNumber)
      .then(result => {
        const {pagination} = this.state;
        pagination.total = result.count; 
        this.setState({
          loading: false,
          data: result.data,
          pagination,
        });
      })
      .catch(() => {
        this.setState({loading: false, data: [], pagination: {defaultCurrent: 1}})
        this.props.updateCurrentPage(1);
      });
  };

  componentDidMount() {
    this.fetchContacts();
  }

  shouldComponentUpdate({pageNumber}) {
    return this.state.pagination.current !== pageNumber;
  }

  handleTableChange = (pagination) => {
    const {pagination: pager} = this.state;
    pager.current = pagination.current;
    this.setState({pagination: {...pager}});
    this.fetchContacts(pagination.current).then(() => this.props.updateCurrentPage(pagination.current));
  }

  render() {
    const {pagination, data, loading} = this.state;
    return (
      <div className="contacts-list-container">
        <Table className="contacts-list"
          rowKey={({id}) => id}
          pagination={pagination}
          loading={loading}
          dataSource={data}
          columns={this.columns}
          bordered={true}
          onChange={this.handleTableChange}
          title={() => <div className="contacts-list-title">Contacts</div>}/>
      </div>
    );
  }
}

export default ContactList;
