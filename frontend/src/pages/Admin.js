import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { List } from '@mantine/core';
import './admin.css';

export const Admin = () => {

    useEffect(() => {
        document.title = "Bürgerbüro - Admin";
    }, []);

    return (
        <div>
            <h1>Admin</h1>
            <List>
                <List.Item>
                    <NavLink to="/admin/aboutus" className="admin-link">Eintrag auf der Landingpage anpassen</NavLink>
                </List.Item>
                <List.Item>
                    <NavLink to="/admin/genehmigungen" className="admin-link">Genehmigungen ansehen</NavLink>
                </List.Item>
                <List.Item>
                    <NavLink to="/admin/accountchanges" className="admin-link">Accountänderungen ansehen</NavLink>
                </List.Item>
            </List>
        </div>
    );
};