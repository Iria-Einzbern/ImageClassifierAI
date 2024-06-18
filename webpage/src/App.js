import Main from "./Pages/Main";
import { Divider } from "antd";

function App() {
  return (
    <div style={{ minHeight: "100vh",backgroundColor: "var(--color_background)",minWidth: '370px',position: 'relative'}}>
      <Main />

      <div style={{height: '100px'}}></div>
      
      <div style={{position: 'absolute',bottom: '0',width: '80%',display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',color: 'gray',marginBottom: '20px',marginLeft: '10%',marginRight: '10%'}}>
        <Divider style={{height: '10px',marginTop: '10px',marginBottom: '20px'}}/>
        <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '80%',fontSize: 'calc(5px + 0.5vw)',fontWeight: '300'}}>
          <span>© 2024 SmartLab. All rights reserved.</span><div style={{flex: 1}}></div><span>联系我们</span>
        </div>
      </div>
    </div>

  );
}

export default App;
