import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/LogIn/LogIn";
import Registration from "../Pages/Registration/Registration";
import EditCategory from "../Pages/Admin/AddCategory/EditCategory";
import AddDonation from "../Pages/Donation/AddDonation/AddDonation";
import AddBlog from "../Pages/User/AddBlog/AddBlog";
import DonationContainer from "../Pages/Donation/Donation/DonationContainer";
import Blogs from "../Pages/Home/Blogs/Blogs";
import BlogsDetails from "../Pages/User/BlogsDetails/BlogsDetails";
import AddFund from "../Pages/Fund/AddFund/AddFund";
import FundContainer from "../Pages/Fund/Fund/FundContainer";
import SingleDonation from "../Pages/Donation/SingleDonation/SingleDonation";
import SingleFund from "../Pages/Fund/SingleFund/SingleFund";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DonationRequest from "../Pages/Dashboard/AdminDashboard/DonationRequest/DonationRequest";
import FundRequest from "../Pages/Dashboard/AdminDashboard/FundRequest/FundRequest";
import UserDonationTable from "../Pages/Dashboard/UserDashboard/UserDonationTable/UserDonationTable";
import UserFundTable from "../Pages/Dashboard/UserDashboard/UserFundTable/UserFundTable";
import FundAllApply from "../Pages/Dashboard/UserDashboard/FundAllApply/FundAllApply";
import UserNotification from "../Pages/Dashboard/UserDashboard/UserNotification/UserNotification";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfile/UserProfile";
import EditDonation from "../Pages/Dashboard/AdminDashboard/EditDonation/EditDonation";
import EditFund from "../Pages/Dashboard/AdminDashboard/EditFund/EditFund";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },{
          path: "login",
          element: <Login />,
        }, {
          path: "registration",
          element: <Registration />,
        },{
          path:'addCategory',
          element: <EditCategory/>
        },{
          path:'addDonation',
          element:<AddDonation/>
        },{
          path:'Donation',
          element:<DonationContainer/>
        },{
          path:'SingleDonation/:id',
          element:<SingleDonation/>
        },{
          path:'addBlog',
          element: <AddBlog/>
        },{
          path:'blogs',
          element: <Blogs/>
        },{
          path:'blogs/:id',
          element: <BlogsDetails/>
        },{
          path:'addFund',
          element:<AddFund/>
        },{
          path:'fund',
          element:<FundContainer/>
        },{
          path:'SingleFund/:id',
          element:<SingleFund/>
        },{
          path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path:'donationRequest',
            element:<DonationRequest/>
          },{
            path:'fundRequest',
            element:<FundRequest/>
          },{
            path:'userDonationTable',
            element:<UserDonationTable/>
          },{
            path:'userFundTable',
            element:<UserFundTable/>
          },{
            path:'fundAllApply/:postId',
            element:<FundAllApply/>
          },{
            path:'userNotification',
            element:<UserNotification/>
          },{
            path:'userProfile',
            element:<UserProfile/>
          },{
            path:'editDonation',
            element:<EditDonation/>
          },{
            path:'editFund',
            element:<EditFund/>
          }
        ]
        }

      ],
    },
  ]);