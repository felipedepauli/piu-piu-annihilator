// Modal.js

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'


const { Option } = Select;

const CustomModal = ({ isOpen, onClose, onSubmit }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (values) => {
      console.log('Received values of form: ', values);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('age', values.age);
      formData.append('description', values.description);
      formData.append('status', values.status);
      formData.append('photo', values.photo[0].originFileObj);
    
      try {
        const response = await axios.post('http://localhost:8081/memory/add', formData);
      } catch (error) {
        console.log(error);
      }
    
      onClose(); // Fechar o modal após a submissão
    };
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
  
    return (
<Modal
  title="Adicionar Usuário"
  open={isOpen}
  onCancel={onClose}
  footer={[
    <Button key="back" onClick={onClose}>
      Cancelar
    </Button>,
    <Button style={{ backgroundColor: '#fffb8f', borderColor: '#262626', color: '#613400' }} key="submit" type="primary" htmlType="submit" form="userForm">
      Enviar
    </Button>,
  ]}
>
  <Form 
    id="userForm"
    name="userForm"
    layout="vertical"
    onFinish={handleSubmit}
  >
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome.' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Idade" name="age" rules={[{ required: true, message: 'Por favor, insira a idade.' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'Por favor, insira uma descrição.' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Por favor, selecione um status.' }]}>
              <Select placeholder="Selecione um status">
                <Option value="active">Sem BOs</Option>
                <Option value="inactive">Procurado pela Interpol</Option>
              </Select>
            </Form.Item>
            <Form.Item name="photo" label="Foto" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload name="photo" listType="picture" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Clique para fazer upload</Button>
                </Upload>
            </Form.Item>

          </Form>
        </Modal>
    );
};

export default CustomModal;
