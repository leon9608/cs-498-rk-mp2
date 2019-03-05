import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import './App.css'
import {Menu, Search, Segment, Grid, Dropdown, Radio} from 'semantic-ui-react'
import apiKey from './config'
import debounce from 'lodash/debounce';


class HomePage extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            order: 'a',
            isLoading: false,
            value: ''
        }
        this.handleSearchChange = debounce(this.handleSearchChange,1000);
        this.filter = this.filter.bind(this)
    }

    componentDidMount() {

    }

    filter = (data) => {

        return data;
    }
    handleOrderChange = (e, data) => {
        this.setState({
            order: data.value,
        })
    }
    handleSortChange = (e,data) =>{
        console.log(data)
    }
    handleSearchChange = debounce((e, {value}) => {
        if(value !== ''){
            this.setState({isLoading: true, value})
            let self = this;
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`)
                .then(function(response) {
                    console.log(self)
                    console.log(response)
                    self.setState({
                        isLoading:false,
                        list: self.filter(response.data.results)
                    })
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    },100)

    handleItemClick = (e, data) => {
        console.log(data);
    }

    render() {
        const {isLoading, order, value} = this.state;
        console.log(value)
        return (
            <div>
                <Menu size={'massive'}>
                    <Menu.Item
                        name='home'
                        active={true}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='gallery'
                        active={false}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <Segment basic textAlign={'center'}>

                    <h1> Search the movie name </h1>
                    <Grid>
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

                                <Dropdown defaultValue='title' fluid selection options={sortOptions} onChange={this.handleSortChange}/>
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

                    </Grid>
                </Segment>
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
