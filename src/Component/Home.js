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
                isColumnEditorVisible: false,
                isRowEditorVisible: false
            },
            editToBeColumn: {
                columnIndex: '',
                data: null
            },
            selectedRowIndex: null
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

    handleOnVisibleOptionsChange = (type, isValue, key) => {
        if(type === 'column') {
            this.handleOnVisibleColumnEditor(isValue, key)
        }else{
            this.handleOnVisibleRowEditor(isValue, key);
        }
    }

    handleOnVisibleColumnEditor = (isValue, key) => {
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

    handleOnVisibleRowEditor = (isValue, key) => {
        this.setState({
            selectedRowIndex: key,
            tableEditorvisibleOptions: {
                ...this.state.tableEditorvisibleOptions,
                isRowEditorVisible: isValue
            },
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

    handleOnTableEdit = (position, operation, type) => {
        let { columns, rows } = this.state.table;
        if (type === 'column') {
            columns = this.handleOnColumnEdit(position, operation)
        } else {
            rows = this.handleOnRowEdit(position, operation)
        }

        this.setState({
            table: {
                rows: rows,
                columns: columns
            }
        })
    }

    handleOnColumnEdit(position, operation) {
        let { table, editToBeColumn } = this.state;
        let { columns } = table;

        let newColumnIndex = uuid();
        const newColumn = {
            key: newColumnIndex,
            name: 'Column Name',
        };

        if (operation === 'add') {
            switch (position) {
                case 'before':
                    columns.splice(editToBeColumn.columnIndex, 0, newColumn)
                    break;
                case 'after':
                    columns.splice(editToBeColumn.columnIndex + 1, 0, newColumn)
                    break;
                default:
                    console.log('Sorry, we are out of ' + position + '.');
            }
        } else {
            columns.splice(editToBeColumn.columnIndex, 1);
        }

        return columns;
    }

    handleOnRowEdit(position, operation) {
        let { table, selectedRowIndex } = this.state;
        let { rows } = table;

        let newRowIndex = uuid();
        const newRow = {
            id: newRowIndex,
        };

        if (operation === 'add') {
            switch (position) {
                case 'before':
                    rows.splice(selectedRowIndex, 0, newRow)
                    break;
                case 'after':
                    rows.splice(selectedRowIndex + 1, 0, newRow)
                    break;
                default:
                    console.log('Sorry, we are out of ' + position + '.');
            }
        } else {
            rows.splice(selectedRowIndex, 1);
        }

        return rows;
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
                    onColumnNameTextChange={this.handleOnColumnNameTextChange}
                    onTableEdit={this.handleOnTableEdit} />
            </div>
        );
    }
}

export default Home;