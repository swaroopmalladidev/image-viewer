import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

/**Styling for the Component - grid, Image, username and addComments area*/
const styles = theme => ({

    grid: {
        width: "95%",
        margin: "auto auto auto auto"
    },

    imgCardContent: {
        width: "100%"
    },

    userFont: {
        "font-weight": 700
    },

    addCommentArea: {
        display: "flex",
        flexDirection: "row",
    }
});

class Home extends Component {

    /**Initializing the Component */
    constructor() {
        super();
        this.state = {
            isLoggedInUser: sessionStorage.getItem('access-token') != null,
            accessToken: sessionStorage.getItem('access-token'),
            username: '',
            profilePicture: '',
            userImages: [],
            filterImages: [],
            commentedId: ''
        }
    }

    componentDidMount() {
        if (this.state.isLoggedInUser) {
            let thisComponent = this;
            let xhrUserData = new XMLHttpRequest();
            //Instagram API for a logged in user to fetch user details
            xhrUserData.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    let responseData = JSON.parse(this.response).data;

                    thisComponent.setState({
                        profilePicture: responseData.profile_picture,
                        username: responseData.username
                    })
                }
            });
            //Get Request for API
            xhrUserData.open('GET', this.props.appURL + "?access_token=" + this.state.accessToken);
            xhrUserData.send();

            let xhrImageData = new XMLHttpRequest();
            xhrImageData.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    let responseData = JSON.parse(this.response).data;

                    responseData.forEach(image => {
                        image.created_time = thisComponent.dateTimeConverter(image.created_time);
                        image.caption.text = image.caption.text.split('\n');
                        image.userComments = [];
                        image.commentText = '';
                    });

                    thisComponent.setState({
                        userImages: responseData,
                        filterImages: responseData,
                        commentText: ''
                    });
                }
            });
            //Get Request for Media
            xhrImageData.open('GET', this.props.appURL + '/media/recent?access_token=' + this.state.accessToken);
            xhrImageData.send();
        }
    }


    // get timestamp input and returns date string in 'dd/mm/yyyy HH:MM:SS' format
    dateTimeConverter(Timestamp) {

        // convert in milliseconds
        let dateObject = new Date(Timestamp * 1000);
        let timeDict = {
            date: dateObject.getDate(),
            month: dateObject.getMonth() + 1,
            year: dateObject.getFullYear(),
            hours: dateObject.getHours(),
            minutes: dateObject.getMinutes(),
            seconds: dateObject.getSeconds()
        }

        // Prefix 0 to single digits like 01/08/2018
        let timeKeys = Object.keys(timeDict);
        for (var i = 0; i < timeKeys.length; i++) {
            let timeValue = timeDict[timeKeys[i]];
            timeDict[timeKeys[i]] = timeValue < 10 ? '0' + timeValue : timeValue;
        }
        return `${timeDict.date}/${timeDict.month}/${timeDict.year} ${timeDict.hours}:${timeDict.minutes}:${timeDict.hours}`;
    }

    // Search Image functionality handler
    searchBoxHandler = (searchText) => {
        let filterImages = (searchText === "") ? this.state.userImages : this.state.userImages.filter(image => image.caption.text[0].toLowerCase().includes(searchText.toLowerCase()) || image.caption.text[1].toLowerCase().includes(searchText.toLowerCase()));
        this.setState({ filterImages: filterImages })
    }

    //likes toggle handler
    likesToggle = (image) => {
        if (image.likeState) {
            if (image.likes.count > 0) {
                image.likes.count--;
            } else {
                image.likes.count = 0;
            }
        } else {
            image.likes.count++;
        }
        image.likeState = !image.likeState;

        this.setState({ ...this.state });
    }

    //Comments handler
    commentsHandler = (event, image) => {
        this.setState({
            commentedId: image.id
        });
        image.commentText = event.target.value;
    }



    render() {
        const { classes } = this.props;
        return (
            <div><Header pageId="home" {...this.props} profilePicture={this.state.profilePicture} {...this.props} searchBoxHandler={this.searchBoxHandler} />
                <Grid container spacing={3} className={classes.grid} >

                    {this.state.filterImages.map(image => (
                        <Grid key={"post" + image.id} item xs={12} sm={6} >
                            <Card>

                                <CardHeader
                                    classes={{ title: classes.userFont }}
                                    avatar={<Avatar src={image.caption.from.profile_picture} />}
                                    title={image.caption.from.username}
                                    subheader={image.created_time}>
                                </CardHeader>

                                <CardContent>
                                    <img src={image.images.standard_resolution.url} alt="post" className={classes.imgCardContent} />
                                    <hr style={{ width: 590 }} />
                                    <Typography className={classes.userFont}>
                                        {image.caption.text[0]}
                                    </Typography>
                                    <Typography className="hash-tag">
                                        {image.caption.text[1]}
                                    </Typography>
                                    <br />
                                    <IconButton onClick={() => this.likesToggle(image)}>
                                        {
                                            image.likeState ? <FavoriteIcon fontSize="large" color='error' /> : <FavoriteBorderIcon fontSize="large" className="favorite-icon" />
                                        }
                                    </IconButton>

                                    <Typography className="likes-count">
                                        {
                                            image.likes.count === 1 ? <span>{image.likes.count} like</span> : <span>{image.likes.count} likes</span>
                                        }
                                    </Typography>

                                    <div className="comments-section">
                                        <FormControl className={classes.addCommentArea} fullWidth>
                                            <InputLabel htmlFor="comments">Add a comment</InputLabel>

                                            <Input id={"comments" + image.id} className="comments-input"
                                                onChange={(event) => this.commentsHandler(event, image)} value={image.id === this.state.commentedId
                                                    ? image.commentText : ''}></Input>
                                            <Button variant="contained" color="primary">ADD</Button>
                                        </FormControl>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div >
        );
    }
}


export default withStyles(styles)(Home);