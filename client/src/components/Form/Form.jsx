import React, {useState, useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";


import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";
import posts from "../../reducers/posts";



const Form = ({currentId, setCurrentId}) => {
    
    const classes = useStyles();

    const [postData, setPostData] = useState({
        creator: '', title: '', messgae: '', tags: '', selectedFile: ''
    });

    const post = useSelector((state) => currentId ? state.posts.find((messgae) => messgae._id === currentId) : null);

    useEffect(() => {
    
        if (post) {
            setPostData(post);
        }
    }, [post])
    
    
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else {
            dispatch(createPost(postData));
        }

        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
        creator: '', title: '', messgae: '', tags: '', selectedFile: ''
    });
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' :  'Creating'} a Memory</Typography>
                {/* Creator */}
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData,  creator: e.target.value })} />
                {/* title */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value })} />
                {/* message */}
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.messgae} onChange={(e) => setPostData({...postData, messgae: e.target.value })} />
                {/* tags */}
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData,  tags: e.target.value })} />
                {/* File  */}
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})} />
                </div>
                {/* button -1 */}
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                {/* button -2 */}
                <Button  variant="contained" color="primary" size="small" onClick={clear} fullWidth >Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;