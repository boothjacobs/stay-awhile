import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { searchRanches, getAllRanches } from '../../store/ranch-store';

import "./guestSide.css";

//browse destinations or search results
const SearchResults = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllRanches())
    }, [dispatch]);

    const ranches = Object.values(useSelector(state => state.ranch));
    // console.log(ranches)

    // const [search_term, setSearchTerm] = useState("");

    // const search = (e) => {
    //     dispatch(searchRanches(search_term));
    //     history.push("/");
    //     history.goBack();
    // };

    return (
        <div className="under-nav">
            <div className="search-header">
                <h1>Browse Destinations</h1>
                {/* <input type="search" name="search_term"
                    value={search_term}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="75"
                    placeholder="Search by name, location, description, etc" />
                <button type="button" onClick={search}>Search</button> */}
            </div>
            {ranches?.map((ranch) => {
                return (
                    <div className="search-result">
                        <img className="search-result-avatar" src={ranch.img_url} alt={ranch.ranch_name} />
                        <div className="search-result-text">
                            <NavLink to={`/destination/${ranch.id}`} className="search-result-title"><h2>{ranch.ranch_name}</h2></NavLink>
                            <h3 className="search-result-subtitle">{ranch.location}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default SearchResults;
