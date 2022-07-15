const mysql = require('mysql2/promise')


async function conectarBD()
{
    if (global.connection && global.connection.state !== 'disconnected')
    {
        return global.connection
    }

    const connection = await mysql.createConnection(
        {
            host     : 'localhost',
            port     : 3306,
            user     : 'root',
            password : '',
            database : 'larabdon'
        }
    );

    global.connection = connection
    return global.connection
}

async function listarCadastros(){
    const conexao = await conectarBD()
    const [registros] = await conexao.query('select * from criancas;')
    return registros
}

async function inserirInterno(interno) {
    const conexao = await conectarBD()
    const sql = "insert into criancas (cri_nome, cri_RG, cri_CPF, cri_Nasc, cri_Status, resp_Nome, nis_BPC,  dataEntrada, dataSaida, motivo, cri_Encaminhado, cri_Acompanhamento, cri_NmroAutos, usuario_sexo) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    return await conexao.query(sql, [interno.nome, interno.rg, interno.cpf, interno.nasc, interno.stats, interno.respNome, interno.bpc, interno.entra, interno.sai, interno.motivo, interno.encaminhado, interno.acomp, interno.autos, interno.sexo])
}

async function apagarInterno(codigo)
{
    const conexao = await conectarBD()
    const sql = "delete from criancas where id=?;"
    return await conexao.query(sql,[codigo])
}

async function recuperarInterno(codigo)
{
    const conexao = await conectarBD()
    const sql = "select * from criancas where id=?;"
    const [pessoa] = await conexao.query(sql,[codigo])
    return pessoa [0]
}

async function alterarInterno(interno){
    const conexao = await conectarBD()
    const sql = "UPDATE criancas SET pernome=?,peridade=?, percpf=? WHERE id=?;"
    return await conexao.query(sql, [interno.nome, interno.rg, interno.cpf, interno.nasc, interno.stats, interno.pais, interno.bpc, interno.entra, interno.sai, interno.motivo, interno.encaminhado, interno.acomp, interno.autos, interno.sexo])
}

module.exports = { listarCadastros, inserirInterno, apagarInterno, recuperarInterno, alterarInterno }