import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Home = () => (
    <Card style={{textAlign: 'center'}}>
        <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Back Office - Administration
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Welcome on administration interface.
                    You can manage devices or users :
                </Typography>
            </CardContent>
            <Button size="small" color="primary">
                <Link to='/devices'>devices</Link>
            </Button>
            <Button size="small" color="primary">
                <Link to='/users'>users</Link>
            </Button>
        </CardActionArea>
    </Card>
);

export default Home;