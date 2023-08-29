import { genChartByAiAsyncMQ } from '@/services/bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Space, Upload, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const params = {
      ...values,
      file: undefined,
    };

    try {
      // const response = await genChartByAiAsync(params, {}, values.file[0].originFileObj);
      const response = await genChartByAiAsyncMQ(params, {}, values.file[0].originFileObj);
      if (!response?.data) {
        message.error('Faile to generate chart');
      } else {
        message.success('Submit Task Successfully. Please check the chart in my chart');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('Faile to generate chart: ' + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Card title="AI Analysis">
        <Form
          form={form}
          name="addChart"
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="goal"
            label="Analysis Goal"
            rules={[{ required: true, message: 'Please enter your analysis goal!' }]}
          >
            <TextArea placeholder="Please Enter your analysis goal:" />
          </Form.Item>
          <Form.Item name="name" label="Chart Name">
            <Input placeholder="Please Enter your chart name:" />
          </Form.Item>
          <Form.Item name="chartType" label="Chart Type">
            <Select
              options={[
                { value: 'bar chart', label: 'bar chart' },
                { value: 'line chart', label: 'line chart' },
                { value: 'pie chart', label: 'pie chart' },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="File Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                Submit
              </Button>
              <Button htmlType="reset">reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddChartAsync;
