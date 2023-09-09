import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pikaLoading from "../assets/pikaloading.gif";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const url = "http://127.0.0.1:5000/api/persons/";
    const {id} = useParams();
    // console.log(id);

    const [person,setPerson] = useState({
        first_name:'',
        last_name:'',
        gender:'',
        email:'',
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchPerson = async() => {

            try {
                const response = await axios.get(url+id);
                setPerson(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPerson();
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setPerson({...person,[name]:value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const updatePerson = async() => {

            try {
                const response = await axios.patch(url+id,{
                    first_name,
                    last_name,
                    gender,
                    email
                });
                setIsLoading(false);
                navigate('/View/'+id);
            } catch (error) {
                console.log(error);
            }
            
        };
        updatePerson();
    };

    const {_id,first_name,last_name,gender,email} = person;

    return (
        <>
        {isLoading ? (<img style={
                            {display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '10%',
                        }
                        }
                        src={pikaLoading} alt="Loading..." />) : 
                            <div className="container">
                                <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="first_name" className="form-label fw-bolder">First Name</label>
                                            <input type="text" onChange={handleChange} value={first_name} className="form-control" id="first_name" name="first_name" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="last_name" className="form-label fw-bolder">Last Name</label>
                                            <input type="text" onChange={handleChange} value={last_name} className="form-control" id="last_name" name="last_name" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="gender" className="form-label fw-bolder">Gender</label>
                                            <input type="text" onChange={handleChange} value={gender} className="form-control" id="gender" name="gender" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label fw-bolder">Email</label>
                                            <input type="email" onChange={handleChange} value={email} className="form-control" id="email" name="email" />
                                        </div>

                                        <div className="mb-3 text-end">
                                            <button type="submit" className="btn btn-outline-primary">Update</button>
                                        </div>
                                </form>
                            </div>
                        }   
        </>
    );
};

export default Edit;