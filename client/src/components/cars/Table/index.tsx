import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Modal, Popconfirm, Space, Table, Typography } from 'antd';
import { Item } from "./types";
import EditableCell from "./EditableCell";
import { Car } from "../../../types";
import { createCar, getAllCars, validateKey } from "../../../api";
import { removeCar, updateCar } from '../../../api/index';

const CarsTable = () => {

  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [newCar, setNewCar] = useState<Car>({ licensePlate: '', ownerName: '', horsePower: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState<boolean>(localStorage.getItem('validated') === 'true')
  const [messageApi, contextHolder] = message.useMessage();

  const validate = (e: any) => {
      setLoading(true)
      validateKey(e.secretKey).then(res => {
          setLoading(false)
          setValidated(res.data)
          if (localStorage.getItem('validated') === 'true') {
            success()
          } else {
            error()
          }
      })
  }

  const showModal = () => {
      setIsModalOpen(true);
  };
  
  const handleOk = () => {
      console.log(newCar)
      setIsModalOpen(false);
      createCar(newCar).then(() => { 
        getCars();
      })
  };
    
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Secret key is correct!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Incorrect secret key!',
    });
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ licensePlate: '', ownerName: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const remove = (record: Partial<Item> & { key: React.Key }) => {
    removeCar(+record.key).then(() => getCars());
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
        updateCar(+key, { licensePlate: row.licensePlate, ownerName: row.ownerName, horsePower: row.horsePower })
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
            <Button type="primary" disabled={!validated || editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
            <Button danger disabled={!validated || editingKey !== ''} onClick={() => remove(record)}>
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

  const getCars = () => {
    getAllCars().then(res => {
      let newData: Item[] = [];
      res.data.map((item: any) => newData.push({ key: item.id.toString(), licensePlate: item.licensePlate, ownerName: item.ownerName, horsePower: item.horsePower }))
      setData(newData)
    })
  }

  useEffect(() => {
    getCars();
  }, [])

  return (
    <Space>
      {contextHolder}
      <Col>

        <Form onFinish={validate}>
              <Form.Item name="secretKey">
                  <Input.Password style={{ width: "25rem" }} placeholder='Enter the secret key to modify or delete cars...' />
              </Form.Item>
              <Button loading={loading} htmlType="submit">Validate</Button>
        </Form>



        <Button disabled={!validated} type="primary" onClick={showModal} style={{ marginBottom: 10, marginTop: 30 }} >
            Create a car
        </Button>
        <Modal 
          title="Car details" 
          open={isModalOpen} 
          okButtonProps={{ disabled: newCar.horsePower === 0 || newCar.horsePower.toString() === ""  || newCar.licensePlate === '' || newCar.ownerName === '' }} 
          okText="Create" 
          onOk={handleOk} 
          onCancel={handleCancel}
        >
            Licence plate number:<Input onChange={(e) => { setNewCar({...newCar, licensePlate: e.target.value } )}} />
            Owner's name: <Input onChange={(e) => setNewCar({...newCar, ownerName: e.target.value } )} />
            Horsepower: <Input onChange={(e: any) => setNewCar({...newCar, horsePower: e.target.value} )} type="number" />
        </Modal>

        <Form form={form} component={false}>
          <Table
            locale={{ emptyText: 'No cars yet.' }}
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
      </Col>
    </Space>
  );
}

export default CarsTable