import LoginService from "./LoginService";

export abstract class APIService 
{
    private static url: string = process.env.REACT_APP_API_URL as string;

    public static enviaObjeto(arquivo: string, objeto: any)
    {
        return fetch( `${this.url}${arquivo}` , {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: {
                'Authorization': `Bearer ${LoginService.getTokenArmazenado()}`,
            }
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
        return fetch(`${this.url}${arquivo}`, {
                headers: {
                    'Authorization': `Bearer ${LoginService.getTokenArmazenado()}`,
                }
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