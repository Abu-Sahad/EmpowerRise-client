import { Link, Outlet } from 'react-router-dom';
const Dashboard = () => {
return (
 <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    </div>
    <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className='menu p-4 w-80 h-full text-base-content'>
            <ul className="bg-base-200 rounded-md h-[80%] p-5 pl-10">
                <li><Link to='/dashboard/userProfile'> User Profile </Link></li>
                <li><Link to='/dashboard/donationRequest'>Donation Request</Link></li>
                <li><Link to='/dashboard/fundRequest'>Fund Request</Link></li>
                <li><Link to='/dashboard/userDonationTable'> Donation Post</Link></li>
                <li><Link to='/dashboard/userFundTable'> Fund Post</Link></li>
                <li><Link to='/dashboard/userNotification'> User Notification </Link></li>
                <li><Link to='/dashboard/editDonation'> Edit Donation </Link></li>
                <li><Link to='/dashboard/editFund'> Edit Fund </Link></li>

            </ul>
        </div>
    </div>
  </div>
    );
};

export default Dashboard;