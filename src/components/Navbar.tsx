'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface Currentstudent{
  lastname:string,
onboarding:number,
referralcode:string,
student_id:number
}

const Navbar = () => {
  const route=useRouter()
  const [id, setid] = useState(undefined)
  // const [lastname, setlastname] = useState('')
  const [currentstudent, setcurrentstudent] = useState<Currentstudent>({
    lastname:'',
    onboarding:0,
    referralcode:'',
    student_id:0
  })
  useEffect(() => {
    const id=localStorage.getItem('studentid')
    if(id){
      const student_id=JSON.parse(id)
      console.log(student_id)
      setid(student_id)
    }
    const currentstudent=localStorage.getItem("currentstudent");
    if(currentstudent){
      const currentstd=JSON.parse(currentstudent)
      // console.log(firstname);
      setcurrentstudent(currentstd)
    }
  
  }, [])
  useEffect(() => {
    // console.log(id);
    console.log(currentstudent);
    
  }, [id,currentstudent])
  
 const logoutuser=()=>{
  const id=localStorage.getItem('currentuser')
  if(id){
    localStorage.removeItem('currentuser')
   route.push('/student_login')
  }
 } 
  
  return (
    <>
    <nav>
<Link href='instructor_signup'>Sign up as an Instructor</Link>
<Link href='instructor_login'>Log in  as an Instructor</Link>
<Link href='signup'>Sign up as a Student</Link>
<Link href='student_login'>Log in  as a student</Link>
{

  currentstudent.lastname!==''?(
    <span>{currentstudent.lastname}</span>
  ):(
    <Link href=''>Other Info</Link>
  )
}
{
currentstudent.lastname!==''?(
  
  <button onClick={logoutuser}>Logout</button>
  // <button onClick={viewcart} style={{cursor:'pointer'}}>View Cart</button>
):(
<p></p>
)
}
{
currentstudent.lastname!==''?(
<Link href='/cart'>Cart</Link>
):(
<p></p>
)
}
{
currentstudent.lastname!==''?(
<Link href='/account'>Account</Link>
):(
<p></p>
)
}

    </nav>
    </>
  )
}

export default Navbar