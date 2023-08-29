import { genChartByAi } from '@/services/bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddChart: React.FC = () => {
  const [chartData, setChartData] = useState<API.BiResponse>();
  const [chartOption, setChartOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    setChartData(undefined);
    setChartOption(undefined);
    setSubmitting(true);
    const params = {
      ...values,
      file: undefined,
    };

    try {
      const response = await genChartByAi(params, {}, values.file[0].originFileObj);
      if (!response?.data) {
        message.error('Faile to generate chart');
      } else {
        message.success('Generate Chart Successfully!');
        const options = JSON.parse(response.data.genChart ?? '');
        if (!options) {
          throw new Error('Failed to generate chart');
        } else {
          setChartData(response.data);
          setChartOption(options);
        }
      }
    } catch (e: any) {
      message.error('Faile to generate chart: ' + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="AI Analysis">
            <Form
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                  <Button htmlType="reset">reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Result from AI">
            {submitting ? (
              <Spin spinning={submitting} />
            ) : (
              chartData?.genResult ?? <div>Submit Your Request First</div>
            )}
          </Card>
          <Divider />
          <Card title="AI Chart">
            {submitting ? (
              <Spin spinning={submitting} />
            ) : chartOption ? (
              <ReactECharts option={chartOption} />
            ) : (
              <div>Submit Your Request First</div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddChart;
