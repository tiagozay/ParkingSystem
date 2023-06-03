export abstract class APIService 
{
    private static url: string = "http://localhost:8080/";

    public static enviaObjeto(arquivo: string, objeto: any)
    {
        return fetch( `${this.url}${arquivo}` , {
            method: "POST",
            body: JSON.stringify(objeto),
        })
            .then(res => {
                if(!res.ok){
                    throw new Error("Erro na requisição, code: "+res.status);
                }
                return res.json();
            })
            .catch( error => {
                console.error(error);
                throw new Error("Erro na requisição");
            } )
    }

    public static buscaObjetos(arquivo: string)
    {
        return fetch(`${this.url}${arquivo}`)
            .then(res => {
                if(!res.ok){
                    throw new Error("Erro na requisição, code: "+res.status);
                }
                return res.json();
            })
            .catch( error => {
                console.error(error);
                throw new Error("Erro na requisição");
            } )
    }
}