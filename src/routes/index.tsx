import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import CreatePeople from "../pages/CreatePeople";
import RegisterPeopleInRoom from "../pages/RegisterPeopleInRoom";
import CreateRoom from "../pages/CreateRoom";
import CreateSpace from "../pages/CreateSpace";
import Break from "../pages/Break";
import MoveGroup from "../pages/MoveGroup";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/create-people" component={CreatePeople} />
    <Route path="/break" component={Break} />
    <Route path="/create-room" component={CreateRoom} />
    <Route path="/create-space" component={CreateSpace} />
    <Route path="/register-people-room" component={RegisterPeopleInRoom} />
    <Route path="/move-group" component={MoveGroup} />
    {/* <Route path="/repositories/:repository+" /> */}
  </Switch>
);

export default Routes;
