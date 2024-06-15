// src/App.js
import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Main = () => {
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // mock upload URL, you should replace it with your own upload URL
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div style={{ width: '50%', margin: '100px auto' }}>
        <h2>图片上传</h2>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
            <UploadOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">
            支持单张或多张图片上传
            </p>
        </Dragger>
        </div>
    );
};

export default Main;
