import React from 'react'
import axios from 'axios'
import {Menu, Search, Segment, Grid, Dropdown, Radio} from 'semantic-ui-react'
import apiKey from '../config'
import debounce from 'lodash/debounce';
import './home.scss'
import DetailPage from './detail'

class HomePage extends React.Component {
    constructor(props) {
        // console.log(props)
        super(props)
        this.state = {
            order: 'a',
            isLoading: false,
            value: '',
            sortBy: 'title',
            list: [],
            index: null,
            detailOpen: false,
        }
        this.handleSearchChange = debounce(this.handleSearchChange, 300);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        let self = this;
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

    filter = (data, sortBy, order) => {
        return data.sort((a, b) => {
            if (sortBy === 'title') {

                return order === 'a' ? (a[sortBy].toLowerCase()).localeCompare(b[sortBy].toLowerCase()) : (b[sortBy].toLowerCase()).localeCompare(a[sortBy].toLowerCase());
            } else {
                return order === 'a' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
            }
        });
    }
    handleOrderChange = (e, data) => {
        this.setState({
            order: data.value,
            list: this.filter(this.state.list, this.state.sortBy, data.value)
        })
    }
    handleSortChange = (e, data) => {

        this.setState({
            sortBy: data.value,
            list: this.filter(this.state.list, data.value, this.state.order),
        })
    }
    handleSearchChange = (e, {value}) => {
        if (value !== '') {
            this.setState({isLoading: true, value})
            let self = this;
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`)
                .then(function (response) {
                    console.log(self)
                    console.log(response)
                    self.setState({
                        isLoading: false,
                        list: self.filter(response.data.results, self.state.sortBy, self.state.order)
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
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
    handleItemClick = (e, data) => {
        console.log(data)
        if (data.name === 'gallery') {
            this.props.history.push({
                pathname: '/cs-498-rk-mp2/gallery',
            })
        }
    }

    render() {
        const {isLoading, order, list} = this.state;
        let reseultRender;

        if (list === null || list.length === 0) {
            reseultRender = <h4>Nothing is shown</h4>;
        } else {

            reseultRender = (<div className='listContainer'> {list.map((data, index) => {
                let imageSrc;
                if (!data.poster_path) {
                    imageSrc = emptyImage;
                } else {
                    imageSrc = 'https://image.tmdb.org/t/p/w400' + data.poster_path;
                }

                return (
                    <div className='itemCard' key={'mykey' + index}>
                        <img src={imageSrc} className='image'/>
                        <div className='content'>
                            <div>{data.title} <br/>
                                Popularity: {data.popularity} <br/>
                                vote Average: {data.vote_average} <br/>
                                vote Count: {data.vote_count} <br/>
                                <a className='link' onClick={this.handleJumpDetail.bind(this, index)}>View Detail</a>
                            </div>

                        </div>
                    </div>
                )
            })}
            </div>)
        }

        return (
            <div>
                <Menu size={'massive'}>
                    <Menu.Item
                        name='Search'
                        active={true}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='gallery'
                        active={false}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <div className={'paralax'}/>
                <Segment basic textAlign={'center'}>

                    <h1> Search the movie name </h1>
                    <Grid centered>
                        <Grid.Row centered verticalAlign={'middle'}>
                            <Grid.Column width={3}>
                                <Search
                                    open={false}
                                    loading={isLoading}
                                    onSearchChange={this.handleSearchChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={1}>

                                <p> Sort by: </p>
                            </Grid.Column>
                            <Grid.Column width={3}>

                                <Dropdown defaultValue='title' fluid selection options={sortOptions}
                                          onChange={this.handleSortChange}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={2}>
                                <Radio
                                    label='Ascending'
                                    name='radioGroup'
                                    value='a'
                                    checked={order === 'a'}
                                    onChange={this.handleOrderChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Radio
                                    label='Descending'
                                    name='radioGroup'
                                    value='d'
                                    checked={order === 'd'}
                                    onChange={this.handleOrderChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        {reseultRender}
                    </Grid>
                </Segment>
                <DetailPage data={this.state} handleClose={this.handleClose} moveLeft={this.moveLeft}
                            moveRight={this.moveRight}/>
            </div>

        )
    }
}

export default HomePage

const sortOptions = [
    {key: 'title', value: 'title', text: 'title'},
    {key: 'popularity', value: 'popularity', text: 'popularity'},
    {key: 'vote_average', value: 'vote_average', text: 'vote_average'},
    {key: 'vote_count', value: 'vote_count', text: 'vote_count'},

]
const emptyImage = require('../asset/Unknown.jpg')

