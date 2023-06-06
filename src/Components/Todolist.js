import React, { useState } from 'react'

function Todolist() {
    const[activity,setactivity]=useState("")
    const[listActivity,setlistActivity]=useState([])
    const addActivity=()=>{
          setlistActivity((listActivity)=>{
            const updateList=[...listActivity,activity]
            setactivity("");
            return updateList
        })
    }
    const hadleonchange=(e)=>{
        setactivity(e.target.value)
    }
    
    const remActivity=(i)=>{
 const updatedListData=listActivity.filter((elem,id)=>{
return i!==id;
 })
 setlistActivity(updatedListData);
    }

    const remallActivity=()=>{
        return setlistActivity([])
    }
  return (
    <div>
        <div className="container">
            <div className="header">TODO LIST</div>
            <input type="text"  placeholder='Add activity'onChange={hadleonchange} value={activity}></input>
            <button onClick={addActivity} >Add</button>
            <p className='List-heading'>Here is your Activities : {")"}</p>
            {listActivity !== [] && listActivity.map((data,i)=>{
                return (
                    <>
                    <p key={i}>
                        <div className="listData">{data}</div>
                        <button onClick={()=>remActivity(i) } className="btn-position">Remove</button>
                    </p>
                    </>
                )
            })}
                {listActivity.length>=1 && <button style={{backgroundColor:"white",color:"black",fontSize:"20px",fontWeight:"bold",width:"20%"}} onClick={remallActivity}>Remove all</button>}

        </div>
       
    </div>
  )
}

export default Todolist