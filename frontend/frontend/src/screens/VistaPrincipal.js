import { connect } from 'react-redux';
import config from '../common-logic/config.js';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HomeIcon from '@material-ui/icons/Home';
import { fetch_data_v2 } from '../common-logic/fetchhandler.js';
import { nvl } from '../common-logic/generic_library.js';
import './VistaPrincipal.css';
import BookIcon from '@material-ui/icons/Book';
import PropTypes from 'prop-types';
import StepRangeSlider from 'react-step-range-slider';
import { types } from '../common-logic/redux-store.js';
 
 
 
 
 
 
function mapDispatchToProps(dispatch) {
    return ({
        makered: () => { dispatch({ type: types.HOMESCREENRED }) },
        makeblue: () => { dispatch({ type: types.HOMESCREENBLUE }) },
        setAppState: (p_new_active_component) => {
            dispatch({
                type: types.LOGINNAV,
                activeLoginComponent: p_new_active_component
            })
        },
        setJWT: (l_JWT) => {
            dispatch({
                type: types.JWT,
                JWT: l_JWT
            })
        },
        setAccount: (account) => {
            dispatch({
                type: types.ACCOUNT,
                account: account
            })
        },
        setLoginState: (l_logIn) => {
            let l_type = l_logIn ? types.LOGIN : types.LOGOUT;
            dispatch({ type: l_type })
        },
    })
};
 
function mapStateToProps(state) {
    return ({
        JWT: state.JWT,
        homeScreenColorFromUp: state.homeScreenColor,
        account: state.account,
        ...state
    });
};
 
 
 
 
 
 
 
const drawerWidth = 0;
const styles = theme => ({
    slider: {
        padding: '22px 0px',
        width: '300px',
    },
 
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100%px)`,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
 
    button: {
        margin: theme.spacing.unit,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
 
const range = [
    { value: 0, step: 1 },
    { value: 10, step: 10 }
 
]
 
 
 
class VistaPrincipal extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            JWTState: "checking",
            JWT: "",
            mobileOpen: false,
            subjects: [],
            questions: [],
            expanded: null,
            answers: [],
            top: false,
            left: false,
            bottom: false,
            right: false,
            value: 30,
        };
 
    };
 
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
 
        handleSliderChange = (value, event, questionId) => {
        let field = "pregunta-" + questionId
 
        this.setState({
            [field]: value,
        })
    }
 
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
 
    handleSubjectClicked = (id) => {
        let token = this.props.JWT
        let role = this.props.account.role
        this.getQuestions(id, token, role)
        document.getElementById("header1").style.display = "none";
        document.getElementById("botonesEncuestas").style.display = "block";
        document.getElementById("tituloBarra").style.display = "block";
        document.getElementById("preguntas").style.display = "block";
        var z = document.getElementById("input");
        for (var i = 1; i <= this.state.questions.length + 1; i++) {
            var xxxx = "input" + (i);
            z = document.getElementById(xxxx);
            if (z) {
                z.value = ""
            }
        }
        this.setState ({
            answer : []
        })

		Object.entries(this.state).forEach(([key, value]) => {
            if (!key.includes("pregunta-"))
                return

			this.setState({[key]: undefined})
 
        });	 


    };
 
    handleDeleteClicked = () => {
        var z = document.getElementById("input");
        for (var i = 1; i <= this.state.questions.length + 1; i++) {
            var xxxx = "input" + (i);
            z = document.getElementById(xxxx);
            if (z) {
                z.value = ""
            }
        }
        this.setState ({
            answer : []
        })

        Object.entries(this.state).forEach(([key, value]) => {
            if (!key.includes("pregunta-"))
                return

			this.setState({[key]: undefined})
 
        });	 

    }
 
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    handleHomeClicked = () => {
        var x = document.getElementById("header1");
        if (x != null && x.style.display === "none" && this.state.questions !== []) {
            x.style.display = "block";
            document.getElementById("preguntas").style.display = "none";
            document.getElementById("tituloBarra").style.display = "none";
        }
        var y = document.getElementById("botonesEncuestas")
        if (y != null && y.style.display === "block" && this.state.questions !== []) {
            y.style.display = "none";
        }
    };
 
 
    handleSubmitQuestions = () => {
        Object.entries(this.state).forEach(([key, value]) => {
            if (!key.includes("pregunta-") || value === undefined)
                return
			
            let l_method = "POST";
            let l_uri = config.mainServerBaseURL + "/answer/" + key.split("pregunta-").pop();
            let l_extra_headers = { 'Authorization': 'Bearer ' + this.props.JWT, };
            let l_body = { answer: value };
            let l_fnc = ((p_resp) => {
                if (p_resp) {
                    
                }
 
            }) 
            fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc)
        });
        alert("Preguntas guardadas correctamente")
    }
 
    handleClickRightMenu(event) {
        this.setState({ anchorElRightMenu: event.currentTarget });
    };
 
 
 
    getSubjects = (token) => {
        let l_method = "GET";
        let l_uri = config.mainServerBaseURL + "/subjects/"
        let l_extra_headers = { 'Authorization': 'Bearer ' + nvl(token, "xx") };
        let l_body = {};
 
        let l_fnc = ((p_resp) => {
            if (p_resp) {
                this.setState({ subjects: p_resp })
            }
        })
 
        fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc);
    }
 
    getQuestions = (id, token, role) => {
        let l_method = "GET";
        let l_uri = config.mainServerBaseURL + "/questions/" + id;
        let l_extra_headers = { 'Authorization': 'Bearer ' + nvl(token, "xx") };
        let l_body = {};
 
        let l_fnc = ((p_resp) => {
            if (p_resp) {
                this.setState({ questions: p_resp })
            }
        })
 
        fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc);
    }
 
 
    async componentDidMount() {
        await this.getSubjects(this.props.JWT)
    }
 
    renderSwitch(question) {
        const { classes } = this.props;
        const { value } = this.state;
        switch (question.type) {
            case 'Text':
                return (
                    <div class="asignaturas-preguntas">
                        <Input
                            id={"input" + question.id}
                            placeholder="Introduzca aquí su respuesta"
                            fullWidth
                            multiline
                            name={"pregunta-" + question.id}
                            rows={2}
                            value={this.state.answers[question.id]}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                    </div>
                )
 
            case 'Slide':
                return (
                    <div className={classes.root}>
                        <div class="slider">
                            <StepRangeSlider
                                classes={{ container: classes.slider }}
                                value={value}
                                range={range}
                                name={"pregunta-" + question.id}
                                onChange={(value, e) => this.handleSliderChange(value, e, question.id)}
                            />
                        </div>
                    </div>
                )
            default:
                return "ERROR, TIPO NO DEFINIDO";
 
        }
    }
 
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
 
 
    render() {
 
        const { classes } = this.props;
        const { expanded } = this.state;
 
        const subjects = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {this.state.subjects.map((subject, index) => (
                        <div class="subjects-list">
                            <ListItem button key={subject.title} onClick={() => {
                                this.handleSubjectClicked(subject.id);
                                document.getElementById("tituloBarra").innerHTML = subject.title;
                            }}>
                                <ListItemIcon><BookIcon /></ListItemIcon>
                                <ListItemText primary={subject.title} />
                            </ListItem>
                        </div>
                    ))}
                </List>
                <Divider />
 
            </div>
        );
 
        let questions = []
        questions =
            this.state.questions.map((question, index) => (
                <div class="preguntas-alumno">
                    <ExpansionPanel key={index} expanded={expanded === 'panel' + index} onChange={this.handleChange('panel' + index)}>
 
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <div class="box-alumno">
                                <Typography class="question-title" className={classes.heading}>{question.title}</Typography>
                            </div>
                        </ExpansionPanelSummary>
 
                        <ExpansionPanelDetails>
                            <Typography>
                                {this.renderSwitch(question)}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            ))
 
 
 
 
        // Futura implementation =================================================
        if (this.props.account.role === "Admin" || this.props.account.role === "Teacher") {
            questions =
                this.state.questions.map((question, index) => {
                    let common;
                    let data = [
                        { calificacion: 0, total: 0 },
                        { calificacion: 1, total: 0 },
                        { calificacion: 2, total: 0 },
                        { calificacion: 3, total: 0 },
                        { calificacion: 4, total: 0 },
                        { calificacion: 5, total: 0 },
                        { calificacion: 6, total: 0 },
                        { calificacion: 7, total: 0 },
                        { calificacion: 8, total: 0 },
                        { calificacion: 9, total: 0 },
                        { calificacion: 10, total: 0 },
                    ];
 
 
 
                    if (question.type === "Text") {
                        let texts = question.answers.map((answer, i) =>
                            <ListItem>
                                <ListItemText primary={answer.answer} />
                            </ListItem>
                        )
 
                        common = <List>{texts}</List>
                    }
 
 
                    if (question.type === "Slide") {
 
                        question.answers.forEach((answer, i) => {
                            data[answer.answer].total = data[answer.answer].total ? data[answer.answer].total + 1 : 1;
                        });
                        common = data.map(function (item) {
                            return `LA CALIFICACION ${item['calificacion']} TIENE UN TOTAL DE ${item['total']} RESPUESTAS</br>`;
                        }).toString();
                    }
 
                    return (
                        <div class="preguntas-alumno">
                            <ExpansionPanel key={index} expanded={expanded === 'panel' + index} onChange={this.handleChange('panel' + index)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div class="box-alumno">
                                        <Typography class="question-title" className={classes.heading}>{question.title}</Typography>
                                    </div>
 
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {common}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    )
                }
                )
        }
        // Futura implementation =================================================
 
 
 
        const cancelButton =
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleDeleteClicked} size="large">
                Borrar
                <DeleteIcon className={classes.rightIcon} />
            </Button>
 
        const submitButton =
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitQuestions} size="large">
                Enviar
                <CloudUploadIcon className={classes.rightIcon} />
            </Button>
 
        const homeButton =
            <Button variant="contained" color="inherit" className={classes.button} onClick={this.handleHomeClicked} size="large">
                Home
                <HomeIcon className={classes.icon} />
            </Button>
 
 
 
 
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} class="appbar">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <div class="bar-title"> eDOC</div>
                        <Button variant="contained"
                            color="success"
                            className={classes.button}
                            onClick={() => {
                                this.props.setAccount({});
                                this.props.setJWT("");
                            }}
                        >
                            {config.uiTexts.Settings.logout}
                        </Button>
                    </Toolbar>
 
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden xsDown implementation="css">
                        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                            <div
                                onClick={this.toggleDrawer('left', false)}
                                onKeyDown={this.toggleDrawer('left', false)}
                            >
                                <div class="subjects-bar" onClick={this.toggleDrawer('left', false)}>{subjects}</div>
                            </div>
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
 
                    {(() => {
                        if (this.props.account.role === "Admin") {
                            return (
                                <div id="header1" class="header">
                                    <div class="container">
                                        <div class="header-content row">
                                            <div id="owl-demo" class="owl-carousel header1">
                                                <div>
                                                    <div class="col-xs-12 col-sm-6 col-md-6 header-text">
                                                        <h2 class="wow bounceIn animated" data-wow-delay=".40s">ADMIN <span>A</span> LA<br />APLICACIÓN DE eDOC</h2>
                                                        <h3 class="wow bounceIn animated" data-wow-delay=".50s">REALIZA TUS EVALUACIONES </h3>
                                                        <p class="wow bounceIn animated" data-wow-delay=".60s">Ten en cuenta que todas las evaluaciones son anónimas y cada persona solo puede evaluar cada asignatura una vez</p>
                                                        <p>
                                                            <div class="btn btn-primary btn-lg btn-ornge wow bounceIn animated" data-wow-delay="1s"><i class="hbtn"></i> <span><button onClick={this.toggleDrawer('left', true)}>Evaluar asignatura</button></span>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (this.props.account.role === "User") {
                            return (
                                <div id="header1" class="header">
                                    <div class="container">
                                        <div class="header-content row">
                                            <div id="owl-demo" class="owl-carousel header1">
                                                <div>
                                                    <div class="col-xs-12 col-sm-6 col-md-6 header-text">
                                                        <h2 class="wow bounceIn animated" data-wow-delay=".40s">BIENVENIDO <span>A</span> LA<br />APLICACIÓN DE eDOC</h2>
                                                        <h3 class="wow bounceIn animated" data-wow-delay=".50s">REALIZA TUS EVALUACIONES </h3>
                                                        <p class="wow bounceIn animated" data-wow-delay=".60s">Ten en cuenta que todas las evaluaciones son anónimas y cada persona solo puede evaluar cada asignatura una vez</p>
                                                        <p>
                                                            <div class="btn btn-primary btn-lg btn-ornge wow bounceIn animated" data-wow-delay="1s"><i class="hbtn"></i> <span><button onClick={this.toggleDrawer('left', true)}>Evaluar asignatura</button></span>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div id="header1" class="header">
                                    <div class="container">
                                        <div class="header-content row">
                                            <div id="owl-demo" class="owl-carousel header1">
                                                <div>
                                                    <div class="col-xs-12 col-sm-6 col-md-6 header-text">
                                                        <h2 class="wow bounceIn animated" data-wow-delay=".40s">BIENVENIDO <span>A</span> LA<br />APLICACIÓN DE eDOC</h2>
                                                        <h3 class="wow bounceIn animated" data-wow-delay=".50s">REALIZA TUS EVALUACIONES </h3>
                                                        <p class="wow bounceIn animated" data-wow-delay=".60s">Ten en cuenta que todas las evaluaciones son anónimas y cada persona solo puede evaluar cada asignatura una vez</p>
                                                        <p>
                                                            <div class="btn btn-primary btn-lg btn-ornge wow bounceIn animated" data-wow-delay="1s"><i class="hbtn"></i> <span><button onClick={this.toggleDrawer('left', true)}>Evaluar asignatura</button></span>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}
 
                    <div class="main-questions">
                        <div id="tituloBarra" class="subject-name"> eDOC</div>
                        <div id="preguntas" class="questions">
                            {questions}
                        </div>
                        <div class="botonesEncuestas1" id="botonesEncuestas">
                            {submitButton}
                            {cancelButton}
                            {homeButton}
                        </div>
 
                    </div>
                </main>
            </div>
        );
    }
 
 
}
VistaPrincipal.propTypes = {
    classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(VistaPrincipal));