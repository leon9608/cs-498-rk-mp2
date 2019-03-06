import React from 'react'


class DetailPage extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = this.props.location.state;
        console.log(this.state)
    }

    componentDidMount() {

    }
    render() {

        return (
            <div>

            </div>
        )
    }
}

export default DetailPage