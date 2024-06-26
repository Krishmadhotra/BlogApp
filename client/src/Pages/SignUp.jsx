import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';

const SignUp=()=>{
        const [formData,setFormData]=useState({});
        const [errorMessages,setErrorMessages]=useState(null);
        const [loading,setLoading]=useState(false)
        const navigate=useNavigate();

        const handleChange = (e) => {
            setFormData({...formData,[e.target.id]:e.target.value.trim()});
        }

        const handleSubmit = async(e)=>{
            e.preventDefault()
            if(!formData.username || !formData.email || !formData.password){
                return setErrorMessages("Please fill out  all the fields")
            }
            try{
                setLoading(true)
                setErrorMessages(null)
                const response=await fetch("/api/auth/signup",{
                    method:"POST",
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify(formData)
                });
                const data=await response.json()
                if(data.success === false){
                    setLoading(false)
                    return setErrorMessages("Username already exists");
                    
                   
                }
                setLoading(false)
                if(response.ok){
                    navigate("/sign-in")
                }

            }
         
            catch(err){
                console.log(err)
                setLoading(false)
            }

        }
    return(
        <div className="min-h-screen mt-20">
          <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <Link to="/" className=" font-bold dark:text-white text-4xl">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Krish's </span>
                  Blog
            </Link>
            <p className="text-sm mt-5">This is a demo project.But you can sign up with ur email and password and with your google also.</p>
            </div>
            <div className="flex-1">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className=" ">
                        <Label value="name@company.com" />
                        <TextInput
                            type="text"
                            placeholder="Username"
                            id="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-1">
                        <Label value="Your Email" />
                        <TextInput 
                            type="email"
                            placeholder="Email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value="Your Password" />
                        <TextInput 
                            type="password"
                            placeholder="Password"
                            id="password"
                            onChange={handleChange}
                        />
                    </div>
                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                        {loading ? (
                            <>
                               <Spinner size='sm' />
                               <span className="pl-3">Loading ...</span>
                            </>
                        ):(
                            'Sign Up'
                        )}
                    </Button>
                </form>

                <div className="flex gap-3 text-sm mt-5">
                    <span>Have an Account ?</span>
                    <Link to="/signin" className="text-blue-500">Sign In</Link>
                </div>
                {
                    errorMessages && (
                        <Alert className="mt-5" color="failure">
                            {errorMessages}
                        </Alert>
                    )
                }
            </div>
        </div>
    </div>
    )
}

export default SignUp;