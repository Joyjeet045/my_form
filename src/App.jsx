import { useState,useEffect } from 'react'
import './App.css'
import { db } from './config/firebase';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection,addDoc, serverTimestamp } from '@firebase/firestore';
import {FaUserAlt} from 'react-icons/fa';
import {BsBookHalf} from "react-icons/bs"
import {MdEmail} from "react-icons/md"
import {BsTelephoneFill} from "react-icons/bs"

function App() {
  const colRef=collection(db,'JoyjeetCS')
  const initialValues={Username:"",Email:"",Branch:"",Phone:""};
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState({})
  const [issubmit,setIsSubmit]=useState(false)
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
    // console.log(formValues)

  }
  const options = [
  'Mech',
  'CSE',
  'Electrical',
  'Chemical',
  'Biotech',
  'Pharma',
  'Electronics',
  'Ceramic',
];
  const handleSubmit=(e)=>{
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  useEffect(()=>{
    console.log(formErrors)

    //if there are no errors and form is submitted
    if(Object.keys(formErrors).length===0 && issubmit ){
      addDoc(colRef,{
        Username:formValues.Username,
        Email:formValues.Email,
        Phone:formValues.Phone,
        Branch:formValues.Branch,
        createdAt:serverTimestamp()
      }).then(()=>{
        Object.keys(formValues).forEach((key)=>{
          formValues[key]=""
        })
      })
      return(toast.success('Data recorded successfully',{
        position:"top-center",
        autoClose:3000,
        closeOnClick:true,
      }))

    }
  },[formErrors])
  const validate=(values)=>{
    const errors={}
    const regex=new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(!values.Username){
      errors.Username="Username is required!"
    }
    if(!values.Branch){
      errors.Branch="Branch is required!"
    }
    if(!values.Email){
      errors.Email="Email is required!"
    }else if(!regex.test(values.Email)){
      errors.Email="This is not a valid email format"
    }
    if(!values.Phone){
      errors.Phone="Phone is required!"
    }else if(String(values.Phone).length!=10){
      errors.Phone="Phone number length is not equal to 10"
    }
    return errors
  }
  
  return (
    <>
      <div className='flex justify-center h-screen items-center'>
        <form className='bg-[#83dde0] border-none shadow-[0_35px_60px_-15px_#36857d] p-4 ' onSubmit={handleSubmit}>
          <h1 className='mb-3 font-bold text-2xl text-center underline'>Login Form</h1>
        

          <div className='flex flex-col items-start m-2'>
            <div className='flex w-24 justify-between items-center'>
            <label htmlFor="Username" >Username</label>
            <FaUserAlt/>
            </div>
            
            <input type="text" name="Username" placeholder="username"
            className='w-96 border-4 p-1  rounded-md border-[#81d2c3] shadow-[0_10px_30px_-12px_#81d234]  mx-auto focus:outline-none hover:bg-yellow-100'
            value={formValues.Username}
            onChange={handleChange}/>
          </div>
          <p className='text-red-600'>{formErrors.Username}</p>
          <div className='flex flex-col items-start m-2'>
          <div className='flex w-24 justify-between gap-4 items-center'>
            <label htmlFor="Username" >Branch</label>
            <BsBookHalf/>
            </div>
            <select name='Branch'
            className='w-96 border-4 p-1 rounded-md border-[#81d2c3] shadow-[0_10px_30px_-12px_#81d234] mx-auto  focus:ring-2 ring-blue-300 focus:outline-none  hover:bg-yellow-100'
            value={formValues.Branch}
            onChange={handleChange}>
              <option value="Select">Select Branch</option>
              {options.map((option)=>(

                <option  value={option}>{option}</option>
              )
              )}
            </select>
            
          </div>
          <p className='text-red-600'>{formErrors.Branch}</p>
          <div className='flex flex-col items-start m-2'>
          <div className='flex w-24 justify-between gap-4 items-center'>
            <label htmlFor="Username" >Email</label>
            <MdEmail/>
            </div>
            <input type="text" name="Email" placeholder="Email"
            className='w-96 border-4 p-1 rounded-md border-[#81d2c3] shadow-[0_10px_30px_-12px_#81d234] mx-auto focus:outline-none  hover:bg-yellow-100'
            input={formValues.Email}
            onChange={handleChange}/>
          </div>
          <p className='text-red-600'>{formErrors.Email}</p>
          <div className='flex flex-col items-start m-2'>
          <div className='flex w-24 justify-between items-center'>
            <label htmlFor="Username" >Phone</label>
            <BsTelephoneFill/>
            </div>
            <input type="number" name="Phone" placeholder="Phone Number"
            className='w-96 border-4 p-1 rounded-md border-[#81d2c3] shadow-[0_10px_30px_-12px_#81d234] mx-auto focus:outline-none  hover:bg-yellow-100'
            value={formValues.Phone}
            onChange={handleChange}/>
          </div>
          <p className='text-red-600'>{formErrors.Phone}</p>
          
          <button className='w-96 mt-4 p-1 border-2 border-slate-300 rounded-lg bg-gradient-to-r from-[#16d2dc] to-[#66d3e1] '>Submit</button>
          <ToastContainer />
        </form>
      </div>
    </>
       
  )
}

export default App
