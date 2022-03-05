import React,{useState,useEffect} from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios'
import { MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


export default function Categories() {
  
  
  const [data,setData] = useState([])

  const fetchData = async () =>{
    const url = 'https://aftereight.herokuapp.com/data'
    await axios.get(url)
        .then(response => {
            console.log(response.data)
            setData(response.data)})
}

  const deleteCategory = (id)=> {
    axios.delete(`https://aftereight.herokuapp.com/data/${id}`)
            .then(response => console.log(response))
            .then(window.location.reload(true))
            .catch(error => console.log(error))
  }

useEffect(()=>{
    fetchData();
},[])
  
  return (
    <div className="Container">
      <MDBTable style={styles.table} hover>
      <MDBTableHead style={{backgroundColor: '#0C56D0', color: 'white'}}>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Image</th>
          <th scope='col'>Edit</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((element)=>(
          <tr>
          <td>{element.name}</td>
          <td><img  width ="80px" height ="80px" style={{objectFit: "cover"}} src={element.image_url}  alt={element.name}/></td>
          <td>
            <Link to='/editarticles' state={{category: element}}>
              <MDBIcon style={{marginRight: '20px',color: 'grey'}} fas icon="edit" size='lg'/>
            </Link>
            <MDBIcon style={{color: 'grey'}} fas icon="trash  " size='lg' type="submit" onClick={()=>(deleteCategory(element._id))} />
            </td>
        </tr>
        ))}
        
      </MDBTableBody>
    </MDBTable>
    </div>
  );
}

const styles = {
  container : {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px'
  },
  table : {
    width: '50%',
    margin: 'auto', 
    marginTop: '20px',
    textAlign: 'center',
    verticalAlign : 'middle'
}
}