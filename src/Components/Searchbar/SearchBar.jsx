import React, {Component} from 'react';
import {ImSearch} from 'react-icons/im';
import {SearchBarStyle,SearchForm,SearchFormButton,SearchFormButtonLabel,SearchFormInput} from "./SearchBarStyle";
import PropTypes from "prop-types";
class SearchBar extends Component{

    state={
        search:''
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };


    handleNameChange =e=>{
       this.setState({search:e.currentTarget.value.toLowerCase()});
    }

    handleSubmit=e=>{
        e.preventDefault()
        if(this.state.search.trim()===''){
           return alert ('Please entry')
        }
        this.props.onSubmit(this.state.search)
        this.setState({search:''})
    }

    render(){
        const {search}=this.state
        return (
            <SearchBarStyle>
                <header className="searchbar">
                    <SearchForm onSubmit={this.handleSubmit} className="form">

                        <SearchFormInput
                            value={search}
                            name='images'
                            className="input"
                            type="text"
                            placeholder="Search images and photos"
                            onChange={this.handleNameChange}
                        />
                        <SearchFormButton type="submit" className="button">
                            <ImSearch style={{marginRight:8}}/>
                            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                        </SearchFormButton>
                    </SearchForm>
                </header>
            </SearchBarStyle>
        );
    }
}

export default SearchBar;