import React , {useState} from 'react'
import { Link } from 'react-router-dom';
import Test from './Test'; 


const DashboardAction = () => {
  const [showTestComponent, setShowTestComponent] = useState(false);

  return (
    <div>
      <Link to="/edit-profile" className="btn btn-light">
      <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fas fa-briefcase text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>

      <button className="btn btn-danger" onClick={()=> setShowTestComponent(!showTestComponent)}> Test Button</button>


      {showTestComponent && <Test />}

    </div>
  )
}

export default DashboardAction
