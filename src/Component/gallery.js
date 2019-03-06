import React from 'react'
import { Menu } from 'semantic-ui-react'
import axios from 'axios'
import apiKey from "../config";
import './gallery.scss'
import DetailPage from './detail'
class GalleryPage extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            active:'all',
            index: null,
        }
    }

    componentDidMount() {
        let self = this;
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=428af83ee908bf38ec9fed020289411f&language=en-US&page=1
`)
            .then(function (response) {
                console.log(response)
                self.setState({
                    list: response.data.results
                })
            })
            .catch(function (error) {
                console.log(error)
            })
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=428af83ee908bf38ec9fed020289411f&language=en-US`)
            .then(function (response) {
                console.log(response)
                self.setState({
                    genres: response.data.genres
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    handleItemClick = (e, data) => {
        if(data.name === 'home') {
            this.props.history.goBack()
        }
    }
    handleAll = ()=>{
        if(this.state.active !== 'all') {
            let self = this;
            axios
                .get(`https://api.themoviedb.org/3/movie/popular?api_key=428af83ee908bf38ec9fed020289411f&language=en-US&page=1`)
                .then(function (response) {
                    console.log(response)
                    self.setState({
                        active: 'all',
                        list: response.data.results
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
    handleGenre = (index) =>{
        if(this.state.active !== this.state.genres[index].name) {
            let self = this;
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?api_key=428af83ee908bf38ec9fed020289411f&sort_by=popularity.desc&page=1&with_genres=${this.state.genres[index].id}`)
                .then(function (response) {
                    console.log(response)
                    self.setState({
                        active: self.state.genres[index].name,
                        list: response.data.results
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }
    handleJumpDetail = (index)=>{
        this.setState({
            index:index,
        })
        this.detail.handleOpen();
    }
    render() {
        if(this.state.list) {
            console.log(this.state.list)
            var photoRender =   (<div className='movieList'> {this.state.list.map((data,index)=>{
                let imageSrc;
                if(!data.poster_path){
                    imageSrc = emptyImage;
                }else{
                    imageSrc  = 'https://image.tmdb.org/t/p/w400'+ data.poster_path;
                }

                return (
                    <img src={imageSrc} className='simpleImage' onClick={this.handleJumpDetail.bind(this,index)}/>
                )
            })}
            </div>)
        }

        let activeItem = this.state.active;
        return (
            <div>
                <Menu size={'massive'}>
                    <Menu.Item
                        name='home'
                        active={false}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='gallery'
                        active={true}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <div className={'horizontalContainer'}>
                <Menu text vertical className='verticalM'>
                    <Menu.Item header>Explore popular by</Menu.Item>
                    <Menu.Item
                        name='all'
                        active={activeItem === 'all'}
                        onClick={this.handleAll}
                    />
                    {this.state.genres?this.state.genres.map((item, index)=>{
                        // console.log(item);
                        return (
                            <Menu.Item
                                name={item.name}
                                active={activeItem === item.name}
                                onClick={this.handleGenre.bind(this,index)}
                            />
                        );

                    }) : null}
                </Menu>

                {photoRender}
                </div>
                <DetailPage data={this.state} ref={ref => this.detail = ref}/>
            </div>
        )
    }
}

export default GalleryPage
const emptyImage = require('../asset/Unknown.jpg')
