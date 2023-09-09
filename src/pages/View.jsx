import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pikaLoading from "../assets/pikaloading.gif";
import { Link , useNavigate} from "react-router-dom";

const View = () => {
    const navigate = useNavigate();
    const url = "http://127.0.0.1:5000/api/persons/";
    const {id} = useParams();
    // console.log(id);

    const [person, setPerson] = useState({});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const deletePerson = async() => {
            const response = await axios.delete(url+id);
            setIsLoading(false);
            navigate('/');
        };
        deletePerson();
    }

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
                            <h4>{first_name+' '+last_name}</h4>
                            <div className="row">
                                <div className="col-md-4">{gender}</div>
                                <div className="col-md-4">{email}</div>
                                <div className="col-md-4">
                                    <form className="d-inline" onSubmit={handleSubmit}>
                                        <button type="submit" className="btn btn-outline-danger btn-sm me-1">Delete</button>
                                    </form>
                                    <Link className="btn btn-outline-info btn-sm" to={`/Edit/${_id}`}>Edit</Link>
                                </div>
                            </div>
                        </div>

            }
        </>
    );
}
export default View;