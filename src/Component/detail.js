import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'


class DetailPage extends React.Component {
    constructor(props){
        super(props)
        this.state = ({
            modalOpen:false
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render(){
        console.log(this.props)
        if(this.props.data.list !== null && this.props.data.index !== null){
            const movie = this.props.data.list[this.props.data.index];
            let imgsrc = 'https://image.tmdb.org/t/p/w300'+ movie.poster_path;
            return(
                <Modal dimmer={'blurring'} open={this.state.modalOpen} onClose={this.handleClose}>
                    <Modal.Header>{movie.title}</Modal.Header>
                    <Modal.Content image>
                        <Image size='medium' src={imgsrc} />
                        <Modal.Description>
                            <Header>vote_average</Header>
                            <p>{movie.vote_average}</p>
                            <Header>vote_count</Header>
                            <p>{movie.vote_count}</p>
                            <Header>Genres</Header>
                            <p>{movie.genre_ids.map((id)=>{
                                return <span>{this.props.data.genres.find(o => o.id == id).name} &nbsp;&nbsp;</span>;
                            })}</p>
                            <Header>Release Date</Header>
                            <p>{movie.release_date}</p>
                            <Header>OverView</Header>
                            <p>{movie.overview}</p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>);
        } else {
            return null;
        }

    }
}

export default DetailPage