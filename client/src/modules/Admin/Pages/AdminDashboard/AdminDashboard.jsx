import react from 'react'
import Stats from '../../Components/Stats/Stats'
import EventsAndGraph from '../../Components/EventsandGraph/EventsAndGraph'

const AdminDashboard = () => {
    return (
    <div className="px-4 md:px-8 lg:px-16 py-6 space-y-10">
      <Stats />
      <EventsAndGraph />
    </div>
    )
}   

export default AdminDashboard