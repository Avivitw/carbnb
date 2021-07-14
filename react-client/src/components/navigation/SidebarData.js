import React from 'react';

import ChatIcon from '@material-ui/icons/Chat';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from "@material-ui/icons/Home";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

export const User = [
  {
    title: "New Bookings",
    icon: <DashboardIcon />,
    link: "/user-dashboard"
  },
  {
    title: "Past Bookings",
    icon: <DashboardIcon />,
    link: "/"
  },
  {
    title: "Favourites",
    icon: <FavoriteBorderIcon />,
    link: "/"
  }
]

export const Host = [
  {
    title: "New Bookings",
    icon: <DashboardIcon />,
    link: "/host-dashboard"
  },
  {
    title: "Past Bookings",
    icon: <DashboardIcon />,
    link: "/host-dashboard/past"
  },
  {
    title: "Vehicle Availabiliy",
    icon: <EventAvailableIcon />,
    link: "/"
  },
  {
    title: "My Vehicles",
    icon: <DriveEtaIcon />,
    link: "/"
  }
]

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/"
  },
  {
    title: "Messages",
    icon: <ChatIcon />,
    link: "/"
  }
]
