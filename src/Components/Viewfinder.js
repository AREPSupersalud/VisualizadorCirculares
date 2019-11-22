import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {mainListItems, secondaryListItems} from './listItems';
import Files from './Files';
import Logo from '../imgs/logo-supersalud-2.png';
import Lupa from "../imgs/lupa.png";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Realizado por '}
            <Link color="inherit" href="https://material-ui.com/">
                Daniel Rosales - Carlos Medina - Amalia Alfonso
            </Link>{' @ '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#77daaf",
        color: "#008021",
        maxHeight: "64px"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class Viewfinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            numberFile: "",
            wordFile: "",
            wordField: "",
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.onChangeNumberFile = this.onChangeNumberFile.bind(this);
        this.onChangeNumberFile = this.onChangeNumberFile.bind(this);
        this.onChangeWordFile = this.onChangeWordFile.bind(this);
        this.onChangeWordField = this.onChangeWordField.bind(this);
    }

    handleDrawerOpen(e) {
        this.setState({open: true});
    }

    handleDrawerClose(e) {
        this.setState({open: false});
    }

    onChangeNumberFile(e) {
        this.setState({numberFile: e.target.value});
    }

    onChangeWordFile(e) {
        this.setState({wordFile: e.target.value});
    }

    onChangeWordField(e) {
        this.setState({wordField: e.target.value});
    }

    render() {
        const {classes} = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            <img src={Logo} style={{maxHeight: "-webkit-fill-available"}}/>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{mainListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Search */}
                            <Grid item xs={12} md={8} lg={12}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Paper>
                                            <br/> BUSCAR ARCHIVO <br/>
                                            <label>
                                                <br/>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <input type="text" value={this.state.numberFile}
                                                               onChange={this.onChangeNumberFile}
                                                               placeholder="Número" className="form-control"/>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <input type="text" value={this.state.wordFile}
                                                               onChange={this.onChangeWordFile}
                                                               placeholder="Palabra Clave"
                                                               className="form-control"/><br/>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button className="btn">
                                                            <img src={Lupa} style={{height: "1.5rem", width: "auto"}}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </label>
                                        </Paper>
                                    </div>
                                    <div className="col-md-6">
                                        <Paper>
                                            <br/> BUSCAR CAMPO <br/>
                                            <label>
                                                <br/>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <input type="text" value={this.state.wordField}
                                                               onChange={this.onChangeWordField}
                                                               placeholder="Campo"
                                                               className="form-control"/><br/>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <button className="btn">
                                                            <img src={Lupa} style={{height: "1.5rem", width: "auto"}}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </label>
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>
                            {/* Results */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Files/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
        )
    };
}

Viewfinder.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Viewfinder);