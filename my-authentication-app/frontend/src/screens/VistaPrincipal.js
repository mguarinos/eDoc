
import VistaAdmin from './VistaAdmin.jsx';
import VistaUser from './VistaUser.jsx';
import VistaTeacher from './VistaTeacher.jsx';

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
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';





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


function rand() {
  return Math.round(Math.random() * 20) - 10;
}


function getModalStyle() {
  const top = 50 /*+ rand();*/
  const left = 50 /*+ rand();*/

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


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
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
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
            open: false,
            open_2: false,
            dense: "asignatura-prueba-15",
            currentSubject: -1,
            difference: [],
            intersection: [],
            type: 'Text'
        };

    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleChange_2 = name => event => {
      this.setState({ [name]: event.target.value });
    };

    // handleCheckboxChange = name => event => {
    //   this.setState({ [name]: event.target.value });
    //   console.log(this.state)
    // };

    handleEnroll = (userId) => {
      // this.setState({ [name]: event.target.value });
      // console.log(this.state)
      let l_method = "POST";
      let l_uri = config.mainServerBaseURL + "/users/enroll/" + this.state.currentSubject + "/" + userId + "/";
      let l_extra_headers = { 'Authorization': 'Bearer ' + this.props.JWT, };
      let l_body = {};
      let l_fnc = ((p_resp) => {
        this.handleOpen_enroll()
      })
      fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc)


  // });
    // alert("Asignatura añadida correctamente")

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
        this.setState({currentSubject:id})
        this.getQuestions(id, token, role)
        document.getElementById("header1").style.display = "none";
        document.getElementById("botonesEncuestas").style.display = "block";
        document.getElementById("tituloBarra").style.display = "block";
        document.getElementById("preguntas").style.display = "block";
        var z = document.getElementById("input");
        for (var i = 1; i <= this.state.questions.length + 1; i++) {
            var aux= "input" + (id);
            z = document.getElementById(aux);
            if (z) {
                z.value = ""
            }
        }

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

        this.handleHomeClicked();
    }

    handleNewQuestion = () => {
      console.log(this.state)
        // Object.entries(this.state).forEach(([key, value]) => {
        //     if (!key.includes("pregunta-") || value === undefined)
        //         return
        //
            let l_method = "POST";
            let l_uri = config.mainServerBaseURL + "/questions/" + this.state.currentSubject;
            let l_extra_headers = { 'Authorization': 'Bearer ' + this.props.JWT, };
            let l_body = { title: this.state.dense_2, type: this.state.type };
            let l_fnc = ((p_resp) => {
                if (p_resp) {
                  // alert("Pregunta guardada correctamente")
                  this.getQuestions(this.state.currentSubject, this.props.JWT, "XXXXXXXX")
                }

            })
            fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc)

            this.setState({open_2: false})
        // });

    }

    handleSubmitSubject = () => {
        // Object.entries(this.state).forEach(([key, value]) => {
            // if (!key.includes("pregunta-") || value === undefined)
                // return

            let l_method = "POST";
            let l_uri = config.mainServerBaseURL + "/subjects/";
            let l_extra_headers = { 'Authorization': 'Bearer ' + this.props.JWT, };
            let l_body = { title : this.state.dense };
            let l_fnc = ((p_resp) => {
                if (p_resp) {
                  let l_method_2 = "POST";
                  let l_uri_2 = config.mainServerBaseURL + "/users/enroll/" + p_resp.id + "/" + this.props.account.id + "/";
                  let l_extra_headers_2 = { 'Authorization': 'Bearer ' + this.props.JWT, };
                  let l_body_2 = {};
                  let l_fnc_2 = ((p_resp_2) => {
                      if (p_resp_2) {
                        this.getSubjects(this.props.JWT)
                      }
                  })
                  fetch_data_v2(l_method_2, l_uri_2, l_extra_headers_2, l_body_2, l_fnc_2)
                }
            })
            fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc)


        // });
        alert("Asignatura añadida correctamente")
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

    handleOpen = () => {
      this.setState({ open: true });
    };

    handleOpen_2 = () => {
      this.setState({ open_2: true });
    };

    handleOpen_enroll = () => {
      this.setState({ open_enroll: true });

      //get all students
      let token = this.props.JWT

      let l_method = "GET";
      let l_uri = config.mainServerBaseURL + "/users/all";
      let l_extra_headers = { 'Authorization': 'Bearer ' + nvl(token, "xx") };
      let l_body = {};

      let l_fnc = ((p_resp) => {
          if (p_resp) {

            let l_method_2 = "GET";
            let l_uri_2 = config.mainServerBaseURL + "/users/enrolled/" + this.state.currentSubject;
            let l_extra_headers_2 = { 'Authorization': 'Bearer ' + nvl(token, "xx") };
            let l_body_2 = {};

            let l_fnc_2 = ((p_resp_2) => {
                if (p_resp_2) {

                  console.log("P_RESP = ", p_resp)
                  console.log("P_RESP=2", p_resp_2)

                  // let difference = p_resp.filter(x => !p_resp_2.includes(x));
                  // let intersection = p_resp.filter(x => p_resp_2.includes(x));

                  let difference = p_resp_2.filter(x =>
                    p_resp.some(y => x.id === y.id)
                  );

                  let intersection = p_resp.filter(x =>
                    !p_resp_2.some(y => x.id === y.id)
                  );



                  console.log(difference)
                  console.log(intersection)

                  this.setState({
                    difference: difference,
                    intersection: intersection
                  })

                }
            })

            fetch_data_v2(l_method_2, l_uri_2, l_extra_headers_2, l_body_2, l_fnc_2);

          }
      })

      fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc);

      //get enrolled students

      //difference
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleClose_2 = () => {
      this.setState({ open_2: false });
    };

    handleClose_enroll = () => {
      this.setState({ open_enroll: false });
    };


    handleSubjectChange = name => event => {
      this.setState({ [name]: event.target.value });
    };


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
        // ESTABLECER ROL
        let role;
        if (this.props.account.roles) {
          this.props.account.roles.forEach((item, i) => {
            if (item.name === "ADMIN")
              role = "ADMIN"
            if (item.name === "TEACHER" && role !== "ADMIN")
              role = "TEACHER"
            if (item.name === "USER" && role !== "ADMIN" && role !== "TEACHER")
              role = "USER"
          });
        }
        const { classes } = this.props;
        const { expanded } = this.state;

        let add_subject_button = role === "ADMIN" ?
          // <div><ListItem button key="admin" onClick={
          //     // this.handleSubjectClicked(subject.id);
          //     // document.getElementById("tituloBarra").innerHTML = subject.title;
          //     this.handleOpen
          // }>
          //     <ListItemIcon><BookIcon /></ListItemIcon>
          //     <ListItemText primary="Añadir asignatura" />
          //   </ListItem>

            <div>
              <Button onClick={this.handleOpen}>Añadir asignatura</Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
              >
                <div style={getModalStyle()} className={classes.paper}>
                    <div class="modal-admin">
                  <Typography variant="h6" id="modal-title">
                    Añadir asignatura
                  </Typography>

                  <TextField
                    id="add-subject"
                    // className={classNames(classes.textField, classes.dense)}
                    onChange={this.handleSubjectChange('dense')}
                    margin="dense"
                  />
                  <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitSubject} size="large">
                      Añadir
                      <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </div>
                </div>
              </Modal>
            </div> : undefined


        // const admin = (



          // )


        // )

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

        if (role === "USER") {
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
            }

        if (role === "ADMIN" || role === "TEACHER") {
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

                        console.log(data)

                        let sum = 0, count = 0;

                        data.forEach((item, i) => {
                          console.log(typeof(item.calificacion))
                          sum += item.calificacion * item.total
                        });

                        console.log(sum)

                        data.forEach((item, i) => {
                          count += item.total
                        });

                        console.log(count)

                        let average = (sum/count).toFixed(2)




                        // let suma = (data.reduce((a,b) => a.calificacion * a.total + b.calificacion * b.total, 0) / data.length)
                        // console.log(suma)
                        // let average = (suma / (data.reduce((a,b) => a.total + b.total, 0))).toFixed(2)


                        common = `La calificación media de la pregunta es de ${average}.`

                        // common = data.map(function (item) {
                        //     return `LA CALIFICACION ${item['calificacion']} TIENE UN TOTAL DE ${item['total']} RESPUESTAS</br>`;
                        // }).toString();
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







        const addQuestionButton = role === "ADMIN" ?
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open_2}
            onClose={this.handleClose_2}
          >
            <div style={getModalStyle()} className={classes.paper}>
            <div class="modal-admin1">
              <Typography variant="h6" id="modal-title">
                Añadir pregunta
              </Typography>

              <TextField
                id="add-subject"
                label="Título de la pregunta"
                value={this.state.dense_2}
                // className={classNames(classes.textField, classes.dense)}
                onChange={this.handleSubjectChange('dense_2')}
                margin="dense"
              />
                <div class="form-option">
              <FormControl className={classes.formControl}>
                <NativeSelect
                  value={this.state.type}
                  onChange={this.handleChange_2('type')}
                  name="type"
                  // className={classes.selectEmpty}
                >
                  <option value="Text">Text</option>
                  <option value="Slide">Slide</option>
                </NativeSelect>
                <FormHelperText>Tipo pregunta</FormHelperText>
                </FormControl>
                </div>



              <Button variant="contained" color="primary" className={classes.button} onClick={this.handleNewQuestion} size="large">
                  Enviar
                  <CloudUploadIcon className={classes.rightIcon} />
              </Button>
              </div>
            </div>
          </Modal>

          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen_2} size="large">
              Añadir pregunta
              <AddCircleIcon/>
          </Button>
          </div> : undefined

          const enrollStudentButton = role === "ADMIN" ?
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open_enroll}
              onClose={this.handleClose_enroll}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                  Matricular usuario
                </Typography>


                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">No matriculados</FormLabel>
                  <FormGroup>
                  {
                    this.state.intersection.map((user, i) => {
                      console.log("USER =", user)
                      return(<FormControlLabel key={i}
                        control={
                          <Checkbox checked={false} onChange={() => this.handleEnroll(user.id)} />
                        }
                        label = {user.email}
                      />)
                    })

                  }

                  </FormGroup>
                  <FormHelperText>Be careful</FormHelperText>
                </FormControl>





                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Matriculados</FormLabel>
                  <FormGroup>
                  {
                    this.state.difference.map((user, i) => {
                      console.log("USER =", user)
                      return(<FormControlLabel key={i}
                        control={
                          <Checkbox checked={false} onChange={() => this.handleChange_2(user.id)} />
                        }
                        label = {user.email}
                      />)
                    })

                  }

                  </FormGroup>
                  <FormHelperText>Be careful</FormHelperText>
                </FormControl>







              </div>
            </Modal>

            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen_enroll} size="large">
                Matricular usuario
                <AddCircleIcon/>
        
            </Button>
            </div> : undefined


        const submitButton = role === "USER" ?
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitQuestions} size="large">
                Enviar
                <CloudUploadIcon className={classes.rightIcon} />
            </Button> : undefined

        const homeButton =
            <Button variant="contained" color="inherit" className={classes.button} onClick={this.handleHomeClicked} size="large">
                Home
                <HomeIcon className={classes.icon} />
            </Button>


        const cancelButton = role === "USER" ?
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleDeleteClicked} size="large">
                Borrar
                <DeleteIcon className={classes.rightIcon} />
            </Button> : undefined



        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} class="appbar">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        {add_subject_button}
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
                        if (role === "ADMIN") {
                            return (
                                <VistaAdmin
                                    role={this.props.account.role}
                                    toggleDrawer={this.toggleDrawer}
                                />
                            )
                        } else if (role === "USER") {
                            return (
                                <VistaUser
                                    role={this.props.account.role}
                                    toggleDrawer={this.toggleDrawer}
                                />
                            )
                        } else if (role === "TEACHER") {
                            return (
                                <VistaTeacher
                                    role={this.props.account.role}
                                    toggleDrawer={this.toggleDrawer}
                                />
                            )
                        }
                    })()}

                    <div class="main-questions">
                        <div id="tituloBarra" class="subject-name"> eDOC</div>
                        <div id="preguntas" class="questions">
                            {questions}
                        </div>
                        <div class="botonesEncuestas1" id="botonesEncuestas">
                            <div class="botonesEncuestas2">
                          {addQuestionButton}
                          {enrollStudentButton}
                            {submitButton}
                            {cancelButton}
                            {homeButton}
                            </div>
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

// const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(VistaPrincipal));