import { APIService } from "./APIService";
import { Sistema } from "../models/Sistema";

export default abstract class ConfigSistemaService {
    static buscaConfigDoSistema(): Promise<Sistema | {}> {
        return APIService.buscaObjetos('buscaConfigDoSistema.php')
            .then(configDoSistemaOBJ => {
                return new Sistema(
                    configDoSistemaOBJ['razaoSocial'],
                    configDoSistemaOBJ['nomeFantasia'],
                    configDoSistemaOBJ['cnpj'],
                    configDoSistemaOBJ['inscricaoEstadual'],
                    configDoSistemaOBJ['telefoneFixo'],
                    configDoSistemaOBJ['telefoneCelular'],
                    configDoSistemaOBJ['cep'],
                    configDoSistemaOBJ['endereco'],
                    configDoSistemaOBJ['numero'],
                    configDoSistemaOBJ['cidade'],
                    configDoSistemaOBJ['uf'],
                    configDoSistemaOBJ['urlSite'],
                    configDoSistemaOBJ['email'],
                    configDoSistemaOBJ['descricao'],
                )
            });
    }

    static editarConfigDoSistema(configSistema: Sistema): Promise<Sistema | undefined> {
        return APIService.enviaObjeto('editarConfigDoSistema.php', configSistema)
            .then(configDoSistemaEditadasOBJ => {

                if (configDoSistemaEditadasOBJ) {
                    return new Sistema(
                        configDoSistemaEditadasOBJ['razaoSocial'],
                        configDoSistemaEditadasOBJ['nomeFantasia'],
                        configDoSistemaEditadasOBJ['cnpj'],
                        configDoSistemaEditadasOBJ['inscricaoEstadual'],
                        configDoSistemaEditadasOBJ['telefoneFixo'],
                        configDoSistemaEditadasOBJ['telefoneCelular'],
                        configDoSistemaEditadasOBJ['cep'],
                        configDoSistemaEditadasOBJ['endereco'],
                        configDoSistemaEditadasOBJ['numero'],
                        configDoSistemaEditadasOBJ['cidade'],
                        configDoSistemaEditadasOBJ['uf'],
                        configDoSistemaEditadasOBJ['urlSite'],
                        configDoSistemaEditadasOBJ['email'],
                        configDoSistemaEditadasOBJ['descricao'],
                    )
                }

                return;
            })
            .catch( () => {
                throw new Error("Erro ao editar configurações do sistema."); 
            } );


    }

}