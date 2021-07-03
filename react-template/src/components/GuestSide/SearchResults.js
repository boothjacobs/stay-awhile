import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { searchRanches } from '../../store/ranch-store';

import "./guestSide.css";

//browse destinations or search results
const SearchResults = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

}

export default SearchResults;
