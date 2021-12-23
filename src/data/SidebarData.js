import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

//Data to store in the SideBar component
export const SidebarData = [{
    title: 'Dashboard',
    path: '/admin',
    icon: < AiIcons.AiOutlineHome color = "#141414" / > ,
    cName: 'side-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon: < FaIcons.FaUsers color = "#141414" / > ,
    cName: 'side-text'
  },
  {
    title: 'Add Painting',
    path: '/addPaintingForm',
    icon: < AiIcons.AiOutlineFileAdd color = "#141414" / > ,
    cName: 'side-text'
  },
  {
    title: 'Products',
    path: '/productsAdmin',
    icon: < FaIcons.FaClipboardList color = "#141414" / > ,
    cName: 'side-text'
  },
];