import HTTPService from "./HTTPService";

const axios = require('axios');


class AuthService{
    static userData = null;
    static cookies = null;
    static init(cookies){
        AuthService.cookies = cookies;
        let userDataString = AuthService.cookies.get('jwt');
        if(userDataString){
            AuthService.userData = userDataString;

            if(!AuthService.cookies.get('access_token')) {
                AuthService.refreshAccessToken(AuthService.userData.username, AuthService.cookies.get('refresh_token'));
            }

        }
    }
    static logout(){
        AuthService.cookies.remove("refresh_token");
        AuthService.cookies.remove("access_token");
        AuthService.cookies.remove("jwt");
        AuthService.cookies.remove("username");
        AuthService.userData = null;
        AuthService.accessToken = null;
    }

    static whoami(accessToken){
        return HTTPService.get(
            '/auth/whoami',
            {
                headers: {
                    "Authorization":accessToken
                }
            }
        );
    }
    static signup(data){
        return HTTPService.post('/auth/signup', data)
            .then((response)=>{
                this.setAccessToken(response.data.accessToken);
                AuthService.cookies.set("refresh_token", response.data.refreshToken,
                    {
                        expires: new Date(Date.now()* 3600 * 1000 * 24 * 30)
                    },
                    {
                       // _skipAuth: true
                    }
                );
                return response;
            })
    }
    static login(username, password){
        let cookieOptions =  {
            expires: new Date(Date.now() * 3600 * 24 * 30 * 1000)
        };

       return HTTPService.post('/auth/login', {
           username:username,
           password: password
       },
           {
              // _skipAuth: true
           })
       .then((response)=>{
           this.setAccessToken(response.data.accessToken);
           AuthService.cookies.set("refresh_token", response.data.refreshToken,
               cookieOptions
           );
           return response;
       })
       .then((response)=>{


           return AuthService.whoami(response.data.accessToken);

       })
       .then((response)=> {

           AuthService.cookies.set("jwt", JSON.stringify(response.data), cookieOptions);
           AuthService.cookies.set("username", response.data.username, cookieOptions);
       });

    }
    static async refreshAccessToken(username, refreshToken){


        let response = await HTTPService.post('/auth/token', {
            refreshToken:refreshToken,
            username: username
        },
            {
                _skipAuth: true
            });
        this.setAccessToken(response.data.accessToken);
        return response;

    }
    static setAccessToken(accessToken){
        let cookieOptions = {};
        cookieOptions.expires = new Date(Date.now() + 60*60000);
        AuthService.cookies.set("access_token", accessToken,
            cookieOptions
        );
    }
    static getAccessToken(){
        let accessToken = AuthService.cookies.get("access_token");
        if(accessToken) {
            return accessToken;
        }
        let refreshToken = AuthService.cookies.get("refresh_token");
        if(refreshToken){
            return AuthService.refreshAccessToken(
                AuthService.cookies.get("username"),
                refreshToken
            );
        }
        return null;

    }


}
export default AuthService;