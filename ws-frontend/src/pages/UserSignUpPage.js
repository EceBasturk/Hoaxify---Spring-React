import React from "react";
import Input from '../components/input'
import { withApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';
class UserSignUpPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        //const value = event.target.value;
        //const name = event.target.name;
        //bu yazımın daha pratik hali şöyledir. Buna object destructor deniyor.

        const { name, value } = event.target;
        //eventin targetindaki name ve value değerlerini alacak.

        // üç nokto (...) spread operatör olarak geçer. içindekileri alıp diğerine kopyalar. objenin kopyasını oluşturur.
        const errors = { ...this.state.errors };
        errors[name] = undefined;

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = 'Password Mismatch';
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = 'Password Mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }

        this.setState({
            // field key ifade ettiği için böyle yazdık
            [name]: value,
            errors
        });
    }

    // onChangeUsername = event => {
    //     this.setState({
    //         username : event.target.value
    //     });
    // };

    // onChangeDisplayName = event => {
    //     this.setState({
    //         displayname : event.target.value
    //     });
    // };

    // onChangePassword = event => {
    //     this.setState({
    //         password : event.target.value
    //     });
    // };

    // onChangePasswordRepeat = event => {
    //     this.setState({
    //         passwordRepeat : event.target.value
    //     });
    // };

    onClickSignup = async event => {
        event.preventDefault();
        // const body = {
        //     username: this.state.username,
        //     displayname: this.state.displayname,
        //     password: this.state.password
        // };
        const { history, dispatch } = this.props;
        const { push } = history;
        const { username, displayName, password } = this.state;
        const body = {
            //ilk kısım input name olan usernamei , ikinici kısım state içindeki username i temsil ediyor
            //username : username,
            // key ve value için kullandıpmız isimlendirme aynı olduğu için şöyle kullanabiliriz:
            username,
            displayName,
            password
        };


        try {
            await dispatch(signupHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        };


        //promise chain
        // signup(body)
        //     .then((response) => {
        //         this.setState({ pendingApiCall: false })
        //     }).catch((error) => {
        //         this.setState({ pendingApiCall: false })
        //     });
    }

    render() {
        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { pendingApiCall } = this.props;

        return (
            <div className='container'>
                <form>
                    <h1 className="text-center">Sign Up </h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange} />
                    <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange} />
                    <Input name="password" label="Password" error={password} onChange={this.onChange} type="password" autocomplete="on" />
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange} type="password" autocomplete="on" />
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickSignup}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={('Sign Up')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const forSignUp = withApiProgress(UserSignUpPage, '/api/1.0/users');


export default connect()(withApiProgress(forSignUp, '/api/1.0/auth'));

