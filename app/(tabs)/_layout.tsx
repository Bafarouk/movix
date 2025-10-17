import React from 'react'
import {Tabs} from "expo-router";
import {icons} from "@/constants/icons";
import TabIconComponent from "@/app/components/TabIconComponent";

const _Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarStyle: {
                position: "absolute",
                overflow: "hidden",
                backgroundColor: "#0f0D23",
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                borderColor: "#0f0D23",
                borderWidth: 1,
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIconComponent focused={focused} icon={icons.home} title="Home"/>
                )
            }}/>
            <Tabs.Screen name="search" options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIconComponent focused={focused} icon={icons.search} title="Search"/>
                )
            }}/>
            <Tabs.Screen name="saved" options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIconComponent focused={focused} icon={icons.save} title="Saved"/>
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIconComponent focused={focused} icon={icons.person} title="Profile"/>
                )
            }}/>
        </Tabs>
    );
}

export default _Layout;