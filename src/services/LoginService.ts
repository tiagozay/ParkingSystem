import { Usuario } from "../models/Usuario";

export default abstract class LoginService {
    private static url: string = process.env.REACT_APP_API_URL as string;

    public static usuarioLogado: Usuario | undefined;

    public static enviaLogin(email: string, senha: string) {
        return fetch( `${this.url}login.php`, {
            method: "POST",
            body: JSON.stringify({email, senha}),
        })
        .then( res => {
            if(res.status === 401){
                throw new Error("E-mail ou senha inválidos.");
            }else if(res.status === 500){
                throw new Error("Não foi possível completar o login");
            }

            return res.json();
        } )
        .then( response => {
            this.usuarioLogado = response.usuario;

            this.armazenaToken(response.token);
        } );
    }

    public static indicadorUsuarioLogado(): Promise<boolean>
    {
        const token = JSON.stringify({token: LoginService.getTokenArmazenado()})

        return fetch(`${this.url}verificaSeUsuarioEstaLogado.php`, {
            method: "POST",
            body: token
        })
        .then( res => res.status === 200 ? res.text() : "Erro")
        .then( text => text === "Usuário logado" );
    }

    public static buscaPermisaoDeExibicaoDaPagina()
    {
        
    }

    public static getTokenArmazenado()
    {
        return localStorage.getItem('token');
    }

    private static armazenaToken(token: string)
    {
        localStorage.setItem('token', token);
    }
}