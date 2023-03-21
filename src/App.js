import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'


function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('My name is');
  const [value, setValue] = useState('');

  const fetchUser =  async () => {

    try{

      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];

      const {phone,email} = person;
      const {large:image} = person.picture;
      const {login:{password}} = person;
      const {street:{number,name}} = person.location;
      const {first, last} = person.name;
      const {dob:{age}} = person;

      console.log(person)

      const newPerson  = {
        image,
        phone,
        email,
        password,
        age,
        street:`${number} ${name}`,
        name: `${first} ${last}`,
      }

      setPerson(newPerson);
      setLoading(false);
      setValue(newPerson.name);


    } catch(error){
      console.log(error)
    }

}

useEffect(() => {fetchUser()}, []);


const mouseOver = (icon) => {

    if(icon === 'user'){
      setTitle('My name is')
      setValue(person.name)
    } else if (icon === 'mail'){
      setTitle('My email is')
      setValue(person.email)
    }else if (icon === 'calendar'){
      setTitle('My age is')
      setValue(person.age)
    }else if (icon === 'map'){
      setTitle('My street is')
      setValue(person.street)
    }else if (icon === 'phone'){
      setTitle('My phone is')
      setValue(person.phone)
    }else if (icon === 'lock'){
      setTitle('My password is')
      setValue(person.password)
    }else {
      setTitle('My name is')
      setValue(person.name)
    }

}



if(loading) return <h1>Loading...</h1>


  return(<main>
    <div className="block bcg-black"></div>
    <section className="section section-center ">
          <div className="container">
            <img src={person.image ? person.image : defaultImage} alt="name" />
            <p className="user-title">{title}</p>
            <p className="user-value">{value}</p>

            <ul className="values-list">
              <li className="icon" onMouseOver={() => mouseOver('user')}><FaUser /></li>
              <li className="icon" onMouseOver={() => mouseOver('mail')}><FaEnvelopeOpen /></li>
              <li className="icon" onMouseOver={() => mouseOver('calendar')}><FaCalendarTimes /></li>
              <li className="icon" onMouseOver={() => mouseOver('map')}><FaMap /></li>
              <li className="icon" onMouseOver={() => mouseOver('phone')}><FaPhone /></li>
              <li className="icon" onMouseOver={() => mouseOver('lock')}><FaLock /></li>
            </ul>

            <button className="btn" onClick={fetchUser}>{loading ? 'loading...' : 'Random user'}</button>
          </div>
    </section>
  </main>)
}

export default App
