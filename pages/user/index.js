import React from 'react';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { Tab, Icon, Button } from 'semantic-ui-react'
import HomeTab from '../../tabs/Home';
import AddTab from '../../tabs/AddFile';
import FetchTab from '../../tabs/FetchFile';

export default () => {
    const handleLogOut = () => {
        localStorage.clear();
        Router.replace('/user/login');
    }


    const panes = [
        {
          menuItem : <Button icon><Icon name='home' /> Home</Button>,
          render: () => <Tab.Pane attached={false}><HomeTab/></Tab.Pane>,
        },
        {
          menuItem: <Button icon><Icon name='hdd' /> Add File</Button>,
          render: () => <Tab.Pane attached={false}><AddTab /></Tab.Pane>,
        },
        {
          menuItem: <Button icon><Icon name='list' /> View File</Button>,
          render: () => <Tab.Pane attached={false}><FetchTab /></Tab.Pane>,
        },
        {
            menuItem: <Button icon onClick={handleLogOut}><Icon name='log out' /> Log Out</Button>,
            render: () => null,
        },
        
    ]


    useEffect(() => {
       const token = localStorage.getItem('token');
       if(!token) Router.replace('/user/login');

    })
    

    return (
        
        <Tab menu={{ pointing: true }} panes={panes}/>
    )
}