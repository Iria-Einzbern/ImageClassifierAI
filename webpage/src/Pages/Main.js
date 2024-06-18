import React, { useState, useEffect } from 'react';
import { Button, Card,Divider } from "antd";
import Upload from '../Pages/Components/upload';
import Prediction from '../Pages/Components/prediction';
import { DotChartOutlined,CaretUpFilled,CaretLeftFilled,RollbackOutlined } from '@ant-design/icons';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '370px',
        margin: 'auto',
        height: '100%',
    },
    top: {
        display: 'flex',
        position: 'fixed',
        flexDirection: 'row',
        fontWeight: 'bold',
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        zIndex: '100',
    },
    backToHome: {
        fontSize: 'calc(8px + 0.5vw)',
        fontWeight: '400',
        color: 'gray',
    },
    topMobile: {
        height: '60px',
        margin: '0 0 10px 0',
        fontSize: 'calc(16px + 0.5vw)',
        padding: '0 5%',
    },
    topDesktop: {
        height: '80px',
        margin: '0 0 calc(10px + 0.5vw) 0',
        fontSize: 'calc(20px + 0.6vw)',
        padding: '0 15%',
    },
    main: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'row', // 默认水平排布
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '10px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        width: '70%',
        marginBottom: '40px',
    },
    mainVertical: {
        flexDirection: 'column', // 垂直排布
        width: '90%',
    },
    mainLeft: {
        position: 'relative',
        flex: 1, // 默认左侧占据剩余空间
    },
    mainLeftMobile: {
        position: 'relative',
        flex: 'none', // 移动设备上左侧不占据剩余空间，宽度自适应
        width: '100%',
        margin: '20px 0', // 添加间距以适应垂直布局

    },
    upload: {
        borderRadius: '10px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.05)',
        padding: '10px',
        backgroundColor: 'rgb(250, 250, 250)',
        zIndex: '10',
    },
    mainSpaceMask: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(16px + 0.5vw)',
        fontWeight: 'bold',
        marginBottom: '10px',
        width: '100%',
        //border: '1px solid #e8e8e8',
        height: '100%',
        //zIndex: '1',
    },
    mainWelcomeTitle: {
        fontSize: 'calc(20px + 1vw)',
        fontWeight: 'bold',
        color: 'var(--color_primary)',
    },
    mainWelcomeSubtitle: {
        fontSize: 'calc(16px + 0.5vw)',
        fontWeight: '350',
    },

    mainSpace: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize: 'calc(16px + 0.5vw)',
        fontWeight: 'bold',
        marginBottom: '10px',
        width: '100%',
        //border: '1px solid #e8e8e8',
        //height: '100%',
        zIndex: '1',
        transition: 'opacity 0.6s, transform 0.6s',
    },
    mainSpaceTitle: {
        fontSize: 'calc(20px + 1vw)',
        fontWeight: 'bold',
        color: 'var(--color_primary)',
    },
};

const Main = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [uploadList, setUploadList] = useState([]);
    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {
        console.log(uploadList)
        if(uploadList.length > 0){
            setUploaded(true);
        }else{
            setUploaded(false);
        }
    },[uploadList])
    
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
        };
        // 初始加载和窗口大小变化时监听
        handleResize();
        window.addEventListener('resize', handleResize);
        // 组件卸载时清除监听
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={styles.container}>
            <div style={isMobile ? {height:'60px',width:'100%',margin: '10px 0',} : {height:'80px',width:'100%',margin: 'calc(20px + 0.5vw) 0 calc(10px + 0.5vw) 0',}}></div>
            <div style={isMobile ? {...styles.top,...styles.topMobile} : {...styles.top,...styles.topDesktop}}>
                <DotChartOutlined style={{marginRight: '10px',fontSize: '120%',color: 'var(--color_primary)'}}/>
                AI图像预测平台
                <div style={{flex: 1}}></div>
                <div style={styles.backToHome}>返回首页<RollbackOutlined style={{marginLeft: '5px',fontSize: '150%'}}/></div>
            </div>

            
            <div style={isMobile ? {...styles.main, ...styles.mainVertical} : styles.main}>
                <div className={`${uploaded ? '':'ripple-effect'}`} style={styles.upload}>
                    <Upload isMobile={isMobile} setUploadList={setUploadList}/>
                </div>


                <div style={{...isMobile ? styles.mainLeftMobile : styles.mainLeft}}>
                    <div style={{ ...styles.mainSpaceMask, flexDirection: isMobile ? 'column' : 'row' }} className={`transition ${uploaded ? 'fadeOutMove' : 'fadeInMove'}`}>
                        <div className='breathing-text' style={{fontSize: 'calc(25px + 2vw)',fontWeight: 'bold',color: 'var(--color_primary)'}}>{isMobile ? <CaretUpFilled /> : <CaretLeftFilled />}</div>
                        <div className='breathing-text'>
                            <div style={styles.mainWelcomeTitle}>欢迎使用</div>
                            <div style={styles.mainWelcomeSubtitle}>请在{isMobile ? '上方' : '左侧'}上传一些图片以开始 =)</div>
                        </div>
                    </div>

                    <div style={{ ...styles.mainSpace, flexDirection: isMobile ? 'column' : 'column',padding: isMobile ? '5px 0' : '10px 20px'}} className={`${uploaded ? 'isNotTransparent' : 'isTransparent'}`}>
                        <div style={styles.mainSpaceTitle}>
                            准备<span style={{color:'black'}}>预测</span>
                        </div>
                        <Divider style={{margin: '5px 0'}}/>
                        <Prediction isMobile={isMobile} uploadList={uploadList} uploaded={uploaded}/>
                    </div>
                    
                </div>


            </div>
        </div>
    );
};

export default Main;
