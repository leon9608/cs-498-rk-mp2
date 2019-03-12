import React from 'react'
import {Menu} from 'semantic-ui-react'
import axios from 'axios'
import apiKey from "../config";
import './gallery.scss'
import DetailPage from './detail'

class GalleryPage extends React.Component {
    constructor(props) {
        // console.log(props)
        super(props)
        this.state = {
            active: 'all',
            index: null,
            modalOpen: false,
            geneList:[],
        }
        this.handleAll = this.handleAll.bind(this)
    }

    componentDidMount() {
        let self = this;
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
            .then(function (response) {
                // console.log(response)
                self.setState({
                    list: response.data.results
                })
            })
            .catch(function (error) {
                console.log(error)
            })
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=428af83ee908bf38ec9fed020289411f`)
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
        if (data.name === 'Search') {
            this.props.history.goBack()
        }
    }
    handleAll = () => {

            let self = this;
            axios
                .get(`https://api.themoviedb.org/3/movie/popular?api_key=428af83ee908bf38ec9fed020289411f&page=1`)
                .then(function (response) {
                    console.log(response)
                    self.setState({
                        active: 'all',
                        list: response.data.results,
                        geneList:[],
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })

    }
    handleGenre = (index) => {
        // if (this.state.active !== this.state.genres[index].name) {
            let self = this;
            let geneString = '';
            let geneList = self.state.geneList;
            if(!geneList.includes(index)){
                geneList.push(index);
            }else{
                geneList.splice( geneList.indexOf(index), 1 );
            }
            console.log(geneList)
            if(geneList.length === 0){
                this.handleAll();
                return;
            }
            geneList.forEach((i) => geneString += self.state.genres[i].id + ',')
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?api_key=428af83ee908bf38ec9fed020289411f&sort_by=popularity.desc&page=1&with_genres=${geneString}`)
                .then(function (response) {
                    console.log(response)
                    self.setState({
                        active: self.state.genres[index].name,
                        list: response.data.results,
                        geneList:geneList,
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        // }

    }
    handleJumpDetail = (index) => {
        this.setState({
            index: index,
            modalOpen: true,
        })
    }
    moveLeft = () => {
        let index = this.state.index - 1;
        if (index < 0) {
            index = this.state.list.length - 1;
        }
        this.setState({
            index: index
        })
    }
    moveRight = () => {
        let index = this.state.index + 1;
        if (index === this.state.list.length) {
            index = 0;
        }
        this.setState({
            index: index
        })
    }
    handleClose = () => this.setState({modalOpen: false})

    render() {
        if (this.state.list) {
            var photoRender = (<div className='movieList'> {this.state.list.map((data, index) => {
                let imageSrc;
                if (!data.poster_path) {
                    imageSrc = emptyImage;
                } else {
                    imageSrc = 'https://image.tmdb.org/t/p/w400' + data.poster_path;
                }

                return (
                    <img src={imageSrc} className='simpleImage' onClick={this.handleJumpDetail.bind(this, index)}/>
                )
            })}
            </div>)
        }

        let activeItem = this.state.active;
        let activeEach = this.state.geneList;
        return (
            <div>
                <Menu size={'massive'}>
                    <Menu.Item
                        name="Search"
                        active={false}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='gallery'
                        active={true}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <div className={'paralax2'}/>
                <div className={'horizontalContainer'}>
                    <Menu text vertical className='verticalM'>
                        <Menu.Item header className={'itemColor'}>Explore popular by</Menu.Item>
                        <Menu.Item className={'itemColor'}
                                   name='all'
                                   active={activeItem === 'all'}
                                   onClick={this.handleAll}
                        />
                        {this.state.genres ? this.state.genres.map((item, index) => {
                            // console.log(item);
                            return (
                                <Menu.Item className={'itemColor'}
                                           name={item.name}
                                           active={activeEach.includes(index)}
                                           onClick={this.handleGenre.bind(this, index)}
                                />
                            );

                        }) : null}
                    </Menu>

                    {photoRender}
                </div>
                <DetailPage data={this.state} handleClose={this.handleClose} moveLeft={this.moveLeft}
                            moveRight={this.moveRight}/>
            </div>
        )
    }
}

export default GalleryPage
const emptyImage = require('../asset/Unknown.jpg')
