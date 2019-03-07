import React from 'react'
import {Button, Header, Image, Modal, Icon} from 'semantic-ui-react'
import './detail.scss'
import PropTypes from 'prop-types';


class DetailPage extends React.Component {
    render() {
        if (this.props.data.list !== null && this.props.data.index !== null) {
            const movie = this.props.data.list[this.props.data.index];
            let imgsrc;
            if (!movie.poster_path) {
                imgsrc = emptyImage;
            } else {
                imgsrc = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
            }
            return (
                <Modal dimmer={'blurring'} open={this.props.data.modalOpen} onClose={this.props.handleClose}>
                    <Modal.Header>{movie.title}&nbsp; (Original Title: &nbsp;{movie.original_title})</Modal.Header>
                    <Modal.Content image>
                        <Image size='medium' src={imgsrc}/>
                        <Modal.Description>
                            <Header>vote_average</Header>
                            <p>{movie.vote_average}</p>
                            <Header>vote_count</Header>
                            <p>{movie.vote_count}</p>
                            <Header>Genres</Header>
                            <p>{movie.genre_ids.map((id) => {
                                return <span>{this.props.data.genres.find(o => o.id === id).name} &nbsp;&nbsp;</span>;
                            })}</p>
                            <Header>Release Date</Header>
                            <p>{movie.release_date}</p>
                            <Header>OverView</Header>
                            <p>{movie.overview}</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' className='leftButton' onClick={this.props.moveLeft}>
                            <Icon name='angle left'/> Last Movie
                        </Button>
                        <Button color='blue' onClick={this.props.moveRight}>
                            Next Movie
                            <Icon name='angle right'/>
                        </Button>
                    </Modal.Actions>
                </Modal>);
        } else {
            return null;
        }

    }
}

const emptyImage = require('../asset/Unknown.jpg')


DetailPage.propTypes = {
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string,
        original_title: PropTypes.string,
        id: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })),
        vote_average: PropTypes.number,
        vote_count: PropTypes.number,
        release_date: PropTypes.string,
        overview: PropTypes.string,
    }),
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
}
export default DetailPage