import React,{useState} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody,MDBIcon,MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';


const Articles = () => {
    const location = useLocation()
    const {category} = location.state
    const [Articles,setArticles] = useState(category.articles)
    const [name,setName] = useState(category.name)
    const [image_url,setImageUrl] = useState(category.image_url)
    const navigate = useNavigate();
    console.log(Articles)
    
    const handleChangeName = ({target}) => {
        const {value} = target
        setName(value)
    }
    const handleChangeImageUrl = ({target}) => {
        const {value} = target
        setImageUrl(value)
    }

    const updateFieldChanged = index => e => {
        console.log('index: ' + index);
        console.log('property name: '+ e.target.name);
        const {name,value} = e.target
        let newArr = [...Articles]; // copying the old datas array
        newArr[index][name] = value; // replace e.target.value with whatever you want to change it to
        setArticles(newArr);
      }

    const handleSubmit = () => (
        axios.put(`https://aftereight.herokuapp.com/data/article/${category._id}`,
        {articles: Articles,name: name, image_url: image_url})
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .then(setTimeout(()=>navigate("/aftereightadmin"),1000))
    )

    const AddNewArticle = ()=>
        {setArticles((prev)=>[
            ...prev,
            {}
        ])
        window.scrollTo(5000,5000)}
    

    const deleteArticle = (index)=> {
        console.log(`I am going to delete element ${index}`)
        let newArr = [...Articles]
        newArr.splice(index,1)
        setArticles(newArr)
    }

    
    return (
    <div className="container" style={styles.container}>
        <div className="left" style={styles.left}>
            <img className='img-fluid shadow-2-strong' src={category.image_url} alt={category.name} style={{ width: "60%",marginBottom:'40px'}}/>
            <MDBInput  label='Name' name= "name" value={name || ''} id='typeText' type='text' onChange={handleChangeName} />
            <span style={{padding: '20px'}}></span>
            <MDBInput  label='Photo URL' name= "name" value={image_url || ''} id='typeText' type='text' onChange={handleChangeImageUrl} />
            {/* <MDBBtn style={{marginTop:'40px'}} color='success' onClick={handleSubmitName} >Change</MDBBtn> */}
        </div>
        <div style={styles.right} className='right'>
            <div className="header" style={styles.header}>
                <MDBBtn style={{marginRight: '20px'}} type="submit" floating size='lg' tag='a' onClick={()=>navigate("/aftereightadmin")}>
                    <MDBIcon fas icon="caret-left" />
                </MDBBtn>
                <MDBBtn  type="submit" onClick={AddNewArticle}>Add</MDBBtn>
            </div>
            
            <MDBTable style={styles.table} hover>
        <MDBTableHead>
            <tr>
            <th scope='col' width="30%">Article</th>
            <th scope='col' width="50%" >Description</th>
            <th scope='col'>Price</th>
            <th scope='col'>Image</th>
            <th scope='col'></th>
            </tr>
        </MDBTableHead>
        
        <MDBTableBody>
            
            {Articles.map((element,index)=>(
                <tr>
                <th scope='row'>
                    <input style={styles.input} type="text" id="name" name ="name" value = { element.name || '' } onChange={updateFieldChanged(index)} />
                </th>
                <td>
                    <textarea cols="40" style={styles.input} type="text" id="description" name ="description" value = { element.description || '' } onChange={updateFieldChanged(index)}/>
                </td>
                <td>
                    <input style={styles.input} type="number" id="price" name ="price" value = { element.price || '' } onChange={updateFieldChanged(index)}/>
                </td>

                <td>
                    <input style={styles.input} type="text" id="image" name ="image" value = { element.image || '' } onChange={updateFieldChanged(index)}/>
                </td>

                <td>
                <MDBIcon type= 'submit' fas icon="trash" onClick={()=>(deleteArticle(index))}/>  
                </td>
            </tr>
            ))}   

        </MDBTableBody>
        
        </MDBTable>
        <MDBBtn style={styles.SaveButton} type="submit" onClick={AddNewArticle}>Add</MDBBtn>
        <MDBBtn style={styles.SaveButton} color ="success" type="submit" onClick={handleSubmit}>Save</MDBBtn>
        </div>
        
    </div>
  )
}

const styles = {
    container : {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px',
        width: '100%'
    },
    left : {
        border: '3px',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px',
    },
    header : {
       display: 'flex',
       flexDirection: 'row',
       width: '100%',
       justifyContent: 'flex-start'
    },
    input : {
        border: 'None',
        borderRadius: '3px',
        width: 'fit-content'
    },
    SaveButton: {
        marginTop: '20px',
        width: '150px',
    },
    table : {
        maxWidth: '90%',
        margin: 'auto', 
        marginTop: '20px'
    }
}

export default Articles