const fetchUser = async () => {
 try {
   const response = await fetch("http://localhost:3000/userDetails");

   if (response.ok) {
     const data = await response.json();
     return data;
   } else {
     throw Error(response.status);
   }
 } catch (error) {
    console.log(error.message)
 }
};

export default fetchUser;
