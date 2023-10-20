import React, { useEffect,useState,  } from "react";
import './EditFood.css';

import {
  Space,
  Button,
  Col,
  Row,
  Form,
  Input,
  message,
  InputNumber,
  Upload,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { FoodInterface } from "../../../interfaces/Ifood";
import {  useParams } from "react-router-dom";
import { UpdateFood,GetFoodById } from "../../../services/http/food/food";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../../interfaces/IUpload";

function EditFood() {

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [profile, setProfile] = useState<ImageUpload>()
  const [food, setFood] = useState<FoodInterface>();


  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: FoodInterface) => {
    values.Profile = profile?.thumbUrl;
    values.ID = food?.ID;
    let res = await UpdateFood(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      
      setTimeout(function () {
        navigate("/home");
      }, 2000);
      setTimeout(function () {
        window.location.reload(); // Reload the page
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
  };




  const getFoodById = async () => {
    let res = await GetFoodById(Number(id));
    if (res) {
      setFood(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        FoodName: res.FoodName ,
        FoodPrice : res.FoodPrice ,
        Description: res.Description,
        
    });
    }
  };

  useEffect(() => {
    getFoodById();
  }, []);

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
      form={form}
       name="basic"
       layout="vertical"
       onFinish={onFinish}
       autoComplete="off"
     >
     <div className = "topbar"></div>
     
     
    
       <div className ="topContent">
         <div className= "leftTopContent">
             <div className = "divBack">
               
             </div>
             <div className = "divFoodName">
               <div className = "divFoodNameLabel">
                 <div className = "beforeFoodNameLabel"></div>
                 <label htmlFor="" className = 'red foodNameLabel'>Menu Name :&nbsp;</label>
               </div>
               <div className = "divFoodNameInput">
                 <Form.Item
                   name="FoodName"
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
                   name="FoodPrice"
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

export default EditFood;
