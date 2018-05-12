import React, { Component } from 'react';
import DynamicTable from './DynamicTable';
import { v4 as uuid } from 'uuid';

const columnConfig = {
    editable: true,
    width: 305,
    resizable: true,
    sortable: true,
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {
                columns: [],
                rows: []
            },
            tableEditorvisibleOptions: {
                isColumnEditorVisible: false
            },
            editToBeColumn: {
                columnIndex: '',
                data: null
            }

        }
    }

    componentDidMount() {
        this.initTable();
    }

    initTable = () => {
        let { table } = this.state;
        let { columns, rows } = table;

        for (var i = 0; i < 4; i++) {
            columns.push({
                key: uuid(),
                name: 'Column Name'
            });
            rows.push({
                id: uuid()
            })
        }

        this.setState({
            table: {
                columns: columns,
                rows: rows
            }
        })
    }

    handleOnTableRowChange = (rows) => {
        this.setState({
            table: {
                ...this.state.table,
                rows: rows
            }
        })

        console.log("THIS TABLE ", this.state.table)
    }

    handleOnVisibleOptionsChange = (isValue, key) => {
        let { editToBeColumn } = this.state;
        if (key) {
            editToBeColumn = this.findSelectedColumn(key);
        }
        this.setState({
            tableEditorvisibleOptions: {
                ...this.state.tableEditorvisibleOptions,
                isColumnEditorVisible: isValue
            },
            editToBeColumn: editToBeColumn
        })


    }

    findSelectedColumn(key) {
        let { columns, editToBeColumn } = this.state.table;

        for (var i = 0; i < columns.length; i++) {
            let currentColumn = columns[i];
            if (currentColumn.key === key) {
                let selectedColumn = {
                    data: currentColumn,
                    columnIndex: i
                }
                editToBeColumn = selectedColumn;
                break;
            }
        }

        return editToBeColumn;
    }

    handleOnColumnNameTextChange = (e, name) => {
        let { editToBeColumn, table } = this.state;
        let { columns } = table;

        editToBeColumn.data.name = name;
        columns.splice(editToBeColumn.columnIndex, 1, editToBeColumn.data);
        this.setState({
            table: {
                ...table,
                columns: columns
            }
        })
    }

    render() {
        const { table, tableEditorvisibleOptions, editToBeColumn } = this.state;
        return (
            <div style={{ minHeight: '350px' }}>
                <h1>Welcome to home page!!!</h1>
                <DynamicTable
                    table={table}
                    columnConfig={columnConfig}
                    onTableRowChange={this.handleOnTableRowChange}
                    tableEditorvisibleOptions={tableEditorvisibleOptions}
                    onVisibleOptionsChange={this.handleOnVisibleOptionsChange}
                    editToBeColumn={editToBeColumn}
                    onColumnNameTextChange={this.handleOnColumnNameTextChange} />
            </div>
        );
    }
}

export default Home;