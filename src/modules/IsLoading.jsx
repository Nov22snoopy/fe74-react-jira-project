import { Spin } from 'antd';
const IsLoading = () => (
  <div 
   className="w-full">
    <Spin tip="Loading" size="large"/>
  </div>
);
export default IsLoading;