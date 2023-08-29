import { listMyChartByPage } from '@/services/bi/chartController';
import { useModel } from '@@/exports';
import { Avatar, Card, List, Result, Row, message } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const processCreateTimeString = (createTime: string) => {
  const timeSplits = createTime.split('T');
  const date = timeSplits[0];
  // const reversedTime = timeSplits[1].split('.')[0].split(':');
  // console.log(reversedTime);
  // const time = reversedTime[0] + ':' + reversedTime[1] + ':' + reversedTime[2];
  // console.log(date + ' ' + time);
  return date;
};

const MyChart: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 20,
    sortField: 'createTime',
    sortOrder: 'descend',
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPage(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        if (res.data.records) {
          res.data.records.forEach((data) => {
            if (data.status === 'succeed') {
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
          });
        }
      } else {
        message.error('Fail to load your chart data');
      }
    } catch (e: any) {
      message.error('Fail to load your chart data' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart">
      <div>
        <Search
          placeholder="Please enter chart name"
          enterButton
          loading={loading}
          onSearch={(value) => {
            setSearchParams({
              ...initSearchParams,
              name: value,
            });
          }}
        />
      </div>
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              currentPage: page,
              pageSize,
            });
          },
          current: searchParams.currentPage,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name}
                description={
                  <div>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <span>{item.chartType ? 'Chart type: ' + item.chartType : undefined}</span>
                      <span>
                        {item.createTime
                          ? 'Create time: ' + processCreateTimeString(item.createTime)
                          : undefined}
                      </span>
                    </Row>
                  </div>
                }
              />
              <>
                {item.status === 'wait' && (
                  <>
                    <Result
                      status="warning"
                      title="Waiting for Generating"
                      subTitle={item.execMessage ?? 'Server Busy. Please wait patiently'}
                    />
                  </>
                )}
                {item.status === 'running' && (
                  <>
                    <Result status="info" title="Generating Chart..." subTitle={item.execMessage} />
                  </>
                )}
                {item.status === 'success' && (
                  <>
                    <div style={{ marginBottom: 16 }} />
                    <p>{'Analysis Goal: ' + item.goal}</p>
                    <div style={{ marginBottom: 16 }} />
                    <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                  </>
                )}
                {item.status === 'failed' && (
                  <>
                    <Result
                      status="error"
                      title="Fail to generate chart"
                      subTitle={item.execMessage}
                    />
                  </>
                )}
              </>
              <span>{item.genResult}</span>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyChart;
