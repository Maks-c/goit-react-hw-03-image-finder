import SearchBar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Loader from "./Components/Loader";
import React, {Component} from "react";
import {AppWrapper} from "./appStyle";
import Modal from "./Components/Modal";
import ButtonLoadMore from "./Components/ButtonLoadMore";
//=====================================================
const API_KEY = '24468331-2772ee4e74396411a92d27e8c';
const PER_PAGE = 12;


class App extends Component {

    state = {
        currentPage: 1,
        searchObject: '',
        hits: [],
        error: null,
        isLoading: false,
        showModal: false,
        tags: '',
        largeImageURL: ''

    }

    componentDidUpdate(prevProps, prevState){
        const prevName = prevState.searchObject
        const nextName = this.state.searchObject
        if(prevName !== nextName) {
            this.fetchQuery()
        }
    }



    fetchQuery = () => {
        const {searchObject, currentPage} = this.state
        this.setState({isLoading: true,})
        fetch(`https://pixabay.com/api/?q=${searchObject}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }

                return Promise.reject(new Error('Упс что-то пошло не так'))
            })
            .then(({hits}) => {
                if(hits.length === 0) {

                    return Promise.reject(new Error("Проверьте ввод запроса"))
                }
                this.setState((prevState) => ({
                    hits: [...prevState.hits, ...hits], currentPage: prevState.currentPage + 1
                }))
            })
            .catch(error => this.setState({error}))
            .finally(() => this.setState({isLoading: false}))
    }


    handleFormSubmit = searchObject => {
        this.setState({
            searchObject:searchObject,
            currentPage:1,
            hits:[],
            error:null
        })
    }

    toggleModal = () => {
        this.setState(({showModal}) => ({showModal: !showModal}))
    }


    onModal = ({largeImageURL, tags}) => {
        this.setState({
            largeImageURL: largeImageURL,
            tags: tags,
        });
        this.toggleModal();
    };


    render(){
        const {hits, error, isLoading, showModal, tags, largeImageURL} = this.state
        const renderButtonLoadMore = hits.length > 0 && !isLoading


        return (

            <AppWrapper>
                <SearchBar onSubmit={this.handleFormSubmit}/>
                {isLoading && <Loader/>}
                {error && <h1>{error.message}</h1>}
                <ImageGallery showQuery={hits} onClick={this.onModal}/>
                {renderButtonLoadMore && <ButtonLoadMore onClick={this.fetchQuery}/>}
                {showModal && <Modal onClose={this.toggleModal}>
                    <img src={largeImageURL} alt={tags}/>
                </Modal>}
            </AppWrapper>)

    }
}

export default App;
