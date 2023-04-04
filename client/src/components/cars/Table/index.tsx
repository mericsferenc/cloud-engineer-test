import React, { useState } from "react";
import { Button, Form, Popconfirm, Space, Table, Typography } from 'antd';
import { Item } from "./types";
import EditableCell from "./EditableCell";

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    licensePlate: `licence ${i}`,
    ownerName: `name ${i}`,
    horsePower: 32,
  });
}

const CarsTable = () => {

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ licensePlate: '', ownerName: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const remove = (record: Partial<Item> & { key: React.Key }) => {
    // TODO:
    // form.setFieldsValue({ licensePlate: '', ownerName: '', address: '', ...record });
    // setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Licence plate number',
      dataIndex: 'licensePlate',
      width: '10%',
      editable: true,
    },
    {
      title: "Owner's name",
      dataIndex: 'ownerName',
      width: '15%',
      editable: true,
    },
    {
      title: 'Horsepower',
      dataIndex: 'horsePower',
      width: '10%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '10%',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Button type="primary" disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
            <Button danger disabled={editingKey !== ''} onClick={() => remove(record)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'horsePower' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Space>
        <Form form={form} component={false}>
          <Table
            size="middle"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
      </Form>
    </Space>
  );
}

export default CarsTable