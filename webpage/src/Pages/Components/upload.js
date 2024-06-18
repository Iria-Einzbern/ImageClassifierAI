import React, { useRef, useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';

import { useDebouncedEffect } from '../../utils/useDebouncedEffect';

registerPlugin(FilePondPluginImagePreview);

const zhCN = {
    labelIdle: "拖放图片到此处或<span class=\"filepond--label-action\">浏览</span>",
    labelInvalidField: "字段包含无效文件",
    labelFileWaitingForSize: "等待文件大小",
    labelFileSizeNotAvailable: "大小不可用",
    labelFileLoading: "加载中",
    labelFileLoadError: "加载错误",
    labelFileProcessing: "上传中",
    labelFileProcessingComplete: "上传完成",
    labelFileProcessingAborted: "上传已取消",
    labelFileProcessingError: "上传错误",
    labelFileProcessingRevertError: "恢复上传错误",
    labelFileRemoveError: "删除文件错误",
    labelTapToCancel: "点击取消",
    labelTapToRetry: "点击重试",
    labelTapToUndo: "点击撤消",
    labelButtonRemoveItem: "删除",
    labelButtonAbortItemLoad: "中止",
    labelButtonRetryItemLoad: "重试",
    labelButtonAbortItemProcessing: "取消",
    labelButtonUndoItemProcessing: "撤消",
    labelButtonRetryItemProcessing: "重试",
    labelButtonProcessItem: "上传"
}

const styles = {
    container: {
    },
    upload: {
        width: '18vw',
        minWidth: "150px",
        minheight: "80vh",
        maxHeight: "85vh",
        overflowY: 'auto',
    },
    uploadIsMobile: {
        width: '100%',
        maxHeight: '350px',
        overflowY: 'auto',
    },
};

const Upload = (props) => {
    const [uniqueId, setUniqueId] = useState(null);
    const pondRef = useRef(null);
    // 获取上传列表的函数
    const getUploadList = () => {
        if (pondRef.current) {
            const files = pondRef.current.getFiles();
            props.setUploadList(files);
        }
    };

    useDebouncedEffect(() => {
        // 获取唯一标识符
        fetch('http://127.0.0.1:5555/uploadAPI/get_unique_id')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setUniqueId(data.unique_id);
            console.log('Unique ID:', data.unique_id);
          })
          .catch(error => {
            console.error('Error fetching unique ID:', error);
          });
    },100,[]);


    return (
        <div style={styles.container}>
            <div style={props.isMobile ? styles.uploadIsMobile : styles.upload}>
                <FilePond
                    ref={pondRef}
                    name="file"
                    allowMultiple={true}
                    maxFiles={10}
                    acceptedFileTypes={['image/*']}
                    maxParallelUploads={3}
                    onaddfile={getUploadList}
                    onupdatefiles={getUploadList}
                    credits={false}
                    {...zhCN}
                    //server='http://127.0.0.1:5555/uploadAPI/upload'
                    server={{
                        url: 'http://127.0.0.1:5555/uploadAPI',
                        process: {
                          url: '/upload',
                          method: 'POST',
                          headers: {},
                          withCredentials: true,
                          onload: (response) => console.log('File uploaded:', response),
                          onerror: (response) => console.error('Upload error:', response),
                          ondata: (formData) => {
                            // 将 uniqueId 添加到表单数据中
                            formData.append('unique_id', uniqueId);
                            return formData;
                          }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Upload;