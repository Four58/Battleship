import React from "react";
import classes from "./Placeholder.module.css"

export default function Placeholder(props) {
    return (
        <div className = {classes.bodybox}>
            <h3 className = {classes.setuptext}>Place your Ships!</h3>
            <div className = {classes.subbodybox}>
                <div className = {classes.ship1} draggable="true"><div id="ship1-0"></div><div id="ship1-1"></div><div id="ship1-2"></div><div id="ship1-3"></div></div>
                <div className = {classes.ship2} draggable="true"><div id="ship2-0"></div><div id="ship2-1"></div><div id="ship2-2"></div><div id="ship2-3"></div></div>
                <div className = {classes.ship3} draggable="true"><div id="ship3-0"></div><div id="ship3-1"></div><div id="ship3-2"></div><div id="ship3-3"></div></div>
                <div className = {classes.ship4} draggable="true"><div id="ship4-0"></div><div id="ship4-1"></div><div id="ship4-2"></div><div id="ship4-3"></div></div>
            </div>
        </div>

    );
}