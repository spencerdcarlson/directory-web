import React, {useContext} from "react";
import {UserContext} from "../../context/user";


const withAuth = BaseComponent => (protectedComponent) =>  {
    const [{ user }] = useContext(UserContext);
    if (user) return <BaseComponent>{protectedComponent}</BaseComponent>;
    return null;
};

export { withAuth }