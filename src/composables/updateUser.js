const updateUser = async (userObj) => {
    const update = userObj,
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }; 

      if(userObj) {
        
      }

    const response = await fetch("http://localhost:3000/userDetails", options)
    
    if(response.ok){
        const data = await response.json()
        return data
        
    } else {
        throw Error(response.status)
    }
}

export default updateUser