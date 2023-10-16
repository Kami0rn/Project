import React, { useState} from "react";
import './Food.css';

import {
  Space,
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  message,
  Upload,
  InputNumber,

} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { FoodInterface } from "../../../interfaces/Ifood";
import { ImageUpload } from "../../../interfaces/IUpload";
import { CreateFood} from "../../../services/http/food/food";

function Food() {
 


    const [profile, setProfile] = useState<ImageUpload>()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: FoodInterface) => {
      values.Profile = profile?.thumbUrl;
      let res = await CreateFood(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "บันทึกข้อมูลไม่สำเร็จ",
        });
      }
    };
  
    const normFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      setProfile(e?.fileList[0])
      return e?.fileList;
    };
  
    
    return (
      
     <div className = "addingPage">
      {contextHolder}
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
      <div className = "topbar"></div>
      
      
      
        <div className ="topContent">
          <div className= "leftTopContent">
              <div className = "divBack">
                <a href="http://" >Back</a>
              </div>
              <div className = "divFoodName">
                <div className = "divFoodNameLabel">
                  <div className = "beforeFoodNameLabel"></div>
                  <label htmlFor="" className = 'red foodNameLabel'>Menu Name :&nbsp;</label>
                </div>
                <div className = "divFoodNameInput">
                  <Form.Item
                    name="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Food Name !",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter Food Name" />
                  </Form.Item>
                </div>
              </div>
              <div className = "divPrice">
                  <div className = "divPriceLabel">
                    <div className = "beforePriceLabel"></div>
                    <label htmlFor="" className = "red priceLabel">Price :&nbsp;</label>
                  </div>
                <div className = "divPriceInput">
                  <Form.Item
                    name="Price"
                    rules={[{ required: true, message: 'Please Enter Price !' }]}
                  >
                    <InputNumber size="large" placeholder="Price"/>
                  </Form.Item>
                </div>
              </div>
              <div className = "divDescription">
                <div className = "divDescriptionLabel">
                  <div className = "beforeDescriptionLabel"></div>
                  <label htmlFor="" className = "red descriptionLabel">Description :&nbsp;</label>
                </div>
                <div className = "divDescriptionInput">
                  <Form.Item
                    name="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Description !",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter Description"/>
                  </Form.Item>
                </div>
              </div>
          </div>
          <div className = "rightTopContent">
          <div className ="topDivPictureShow">
  
  </div>
  <div className = "divPictureShow">
  <div className = "divBeforePicture">
    <Form.Item
      name="Profile"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload maxCount={1} multiple={false} listType="picture-card" >
        <div id = "pictureShow">
          <PlusOutlined />
        
        </div>
        </Upload>
    </Form.Item>
  </div>
  
  </div>
  <div className = 'divPictureInput'>
  <label htmlFor="file" className = "red pictureLabel"><u>Add Food Picture here!!</u></label>
  
  </div>
          </div>
        </div>
        <div className = "bottomContent">
          <div className= "leftBottomContent">
            
          </div>
          <div className = "rightBottomContent">
            <Row justify="center">
              <Col style={{ marginTop: "40px" }}>
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      APPLY
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
           
            
  
      </Form>
  
     </div>
    );
}

export default Food;


