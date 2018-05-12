import React, { Component } from 'react'
import { Button, Divider, Header, Segment, Transition, Input, Icon } from 'semantic-ui-react';
import update from 'immutability-helper';
import { v4 as uuid } from 'uuid';
import ReactDataGrid from 'react-data-grid';
import { Socket } from 'dgram';
const { Toolbar, Draggable: { Container: DraggableContainer } } = require('react-data-grid-addons');


class DynamicTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getColumns = () => {
        const { columnConfig, table } = this.props;
        const { columns } = table;
        const { editable, resizable, width, sortable } = columnConfig;
        let outputColumns = [];

        for (let i = 0; i < this.getColumnSize(); i++) {
            let curentColumn = columns[i];
            let column = {
                key: curentColumn.key,
                name: curentColumn.name,
                editable: editable,
                width: width,
                resizable: resizable,
                sortable: sortable,
            }
            outputColumns.push(column);
        }

        outputColumns.events = {
            onClick: (ev, args) => {
                const idx = args.idx;
                const rowIdx = args.rowIdx;
                this.grid.openCellEditor(rowIdx, idx);
            }
        };

        return outputColumns;
    };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.props.table.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = Object.assign(rowToUpdate, updated)
            rows[i] = updatedRow;
            this.props.onTableRowChange(rows)
        }
    };

    getRowAt = (index) => {
        if (index < 0 || index > this.getSize()) {
            return undefined;
        }

        return this.props.table.rows[index];
    };

    getSize = () => {
        return this.props.table.rows.length;
    };

    getColumnSize = () => {
        return this.props.table.columns.length;
    };

    render() {
        let { tableEditorvisibleOptions, onVisibleOptionsChange, onColumnNameTextChange, editToBeColumn } = this.props;
        let { data } = editToBeColumn;
        const { isColumnEditorVisible } = tableEditorvisibleOptions;
        return (
            <div>
                <Transition.Group animation={'fade up'} duration={500}>
                    {isColumnEditorVisible &&
                        <div>
                            <div>
                                <Header as='h5' content='Edit columns' />
                            </div>
                            <Input
                                placeholder={'Edit cell'}
                                value={data.name}
                                onChange={(e, {value}) => {onColumnNameTextChange(e, value)}}
                            />
                            <Button color='blue' basic content='Insert before' />
                            <Button color='blue' basic content='Insert after' />
                            <Button color='red' basic content='Remove' />
                            <Button color='red' floated='right' basic animated='vertical' onClick={() => onVisibleOptionsChange(false)}>
                                <Button.Content hidden>Close</Button.Content>
                                <Button.Content visible>
                                    <Icon name='close' />
                                </Button.Content>
                            </Button>
                        </div>}
                </Transition.Group>
                <Divider hidden />
                <DraggableContainer>
                    <ReactDataGrid
                        onGridSort={(sortColumn) => onVisibleOptionsChange(true, sortColumn)}
                        ref={node => this.grid = node}
                        enableCellSelect={true}
                        columns={this.getColumns()}
                        rowGetter={this.getRowAt}
                        rowsCount={this.getSize()}
                        onGridRowsUpdated={this.handleGridRowsUpdated}
                        rowHeight={50}
                        minHeight={600}
                        rowScrollTimeout={200} />
                </DraggableContainer>
            </div>
        );
    }
}

export default DynamicTable;
