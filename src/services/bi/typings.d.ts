declare namespace API {
  type addParams = {
    name: string;
  };

  type BaseResponseBiResponse = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageChart = {
    code?: number;
    data?: PageChart;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    genChart?: string;
    genResult?: string;
    chartId?: number;
  };

  type Chart = {
    id?: number;
    goal?: string;
    name?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartAddRequest = {
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartEditRequest = {
    id?: number;
    goal?: string;
    name?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    goal?: string;
    name?: string;
    chartType?: string;
    userId?: number;
  };

  type ChartUpdateRequest = {
    id?: number;
    goal?: string;
    name?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type genChartByAiAsyncMQParams = {
    genChartByAiRequest: GenChartByAiRequest;
  };

  type genChartByAiAsyncParams = {
    genChartByAiRequest: GenChartByAiRequest;
  };

  type genChartByAiParams = {
    genChartByAiRequest: GenChartByAiRequest;
  };

  type GenChartByAiRequest = {
    name?: string;
    goal?: string;
    chartType?: string;
  };

  type getChartByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChart = {
    records?: Chart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type uploadFileParams = {
    uploadFileRequest: UploadFileRequest;
  };

  type UploadFileRequest = {
    biz?: string;
  };

  type User = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    userName?: string;
    userAvatar?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type userLoginParams = {
    userLoginRequest: UserLoginRequest;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userName?: string;
    userRole?: string;
  };

  type userRegisterParams = {
    userRegisterRequest: UserRegisterRequest;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    confirmPassword?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userRole?: string;
    createTime?: string;
  };
}
