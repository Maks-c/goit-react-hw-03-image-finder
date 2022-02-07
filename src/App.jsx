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
        if(prevName !== nextName || prevState.currentPage !== this.state.currentPage) {
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
                if(!hits.length) {
                    return Promise.reject(new Error("Проверьте ввод запроса"))
                }

                const images=hits.map(({webformatURL,id,tags,largeImageURL})=>({
                    webformatURL,id,tags,largeImageURL
                }))

                // console.log(images)
                this.setState((prevState) => ({
                    hits: [...prevState.hits, ...images]
                }))
            })
            .catch(error => this.setState({error}))
            .finally(() => this.setState({isLoading: false}))
    }


    onLoadMoreButton=()=>{
        this.setState(prevState =>({currentPage:prevState.currentPage+1}))
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
                {error && <h1>{error.message}</h1>}
                {hits.length >0 && <ImageGallery showQuery={hits} onClick={this.onModal}/>}
                {isLoading && <Loader/>}
                {renderButtonLoadMore && <ButtonLoadMore onClick={this.onLoadMoreButton}/>}
                {showModal && <Modal onClose={this.toggleModal}>
                    <img src={largeImageURL} alt={tags}/>
                </Modal>}
            </AppWrapper>)

    }
}

export default App;
