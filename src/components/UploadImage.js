import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { Button } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  });
const UploadImage = ({ setFile, image }) => {
  return (
    <>
      <Upload.Dragger
        multiple
        listType="picture"
        action={'http://localhost:3000/'}
        showUploadList={{ showRemoveIcon: true }}
        accpet=".png,.jpeg"
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
      >
        Drag files here Or
        <br />
      </Upload.Dragger>
    </>
  );
};
export default UploadImage;
