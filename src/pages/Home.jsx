import axios from "axios";
import { useEffect, useState } from "react";
import pikaLoading from "../assets/pikaloading.gif";
import {Link} from "react-router-dom";

const Home = () => {
    const url = "http://127.0.0.1:5000/api/persons";

    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPersons = async() => {
            try {
                const response = await axios.get(url);
                const person = await response.data;
                setPersons(person);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
            
        };

        fetchPersons();
    },[]);


    return(
        <div className="container shadow">
        {isLoading ? (<img style={
                            {display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '10%',
                        }
                        }
                        src={pikaLoading} alt="Loading..." />) : 
            <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th>Fullname</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                {persons.map(({_id,first_name,last_name,gender,email})=>{
                    return <tr key={_id}>
                        <td>{first_name+' '+last_name}</td>
                        <td>{gender}</td>
                        <td>{email}</td>
                        <td><Link className="btn btn-outline-primary btn-sm" to={`/View/${_id}`}>View</Link></td>
                    </tr>
                })}
                </tbody>
            </table>
            </div>
        }
        </div>
       
    );
};

export default Home;