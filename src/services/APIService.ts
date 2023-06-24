import LoginService from "./LoginService";

export abstract class APIService 
{
    private static url: string = process.env.REACT_APP_API_URL as string;
    private static isProduction: boolean = false;

    public static enviaObjeto(arquivo: string, objeto: any)
    {
        //Se a propriedade isProduction for true, indica que é nescessária a autenticação, aí envia o header Authorization com o token
        const headers = this.isProduction ? {
            'Authorization': `Bearer ${LoginService.getTokenArmazenado()}`
        } : undefined;

        return fetch( `${this.url}${arquivo}` , {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: headers
        })
            // .then( res => {
            //     res.text().then( txt => console.log(txt))
            //     return res;
            // } )
            .then(res => {
                if(!res.ok){
                    throw new Error("Erro na requisição, code: "+res.status);
                }

                const contentType = res.headers.get('content-type');
                
                if(contentType?.includes('application/json')){
                    return res.json();
                }
                
                return res.text();
            
            })
            .catch( error => {
                console.error(error);
                throw new Error("Erro na requisição");
            } )
    }

    public static buscaObjetos(arquivo: string)
    {
        //Se a propriedade isProduction for true, indica que é nescessária a autenticação, aí envia o header Authorization com o token
        const headers = this.isProduction ? {
            'Authorization': `Bearer ${LoginService.getTokenArmazenado()}`
        } : undefined;

        return fetch(`${this.url}${arquivo}`, {
                headers: headers
            })
            .then(res => {
                if(!res.ok){
                    throw new Error("Erro na requisição, code: "+res.status);
                }
                const contentType = res.headers.get('content-type');
                
                if(contentType?.includes('application/json')){
                    return res.json();
                }
            })
            .catch( error => {
                console.error(error);
                throw new Error("Erro na requisição");
            } )
    }
}