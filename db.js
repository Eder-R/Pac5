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


async function listarCriancas()
{
    const conexao = await conectarBD()
    const [registros] = await conexao.query('select * from criancas;')
    return registros
}

async function inserirPessoa(pessoa)
{
    const conexao = await conectarBD()
    cri_Id, resp_Id, cri_nome, cri_RG, cri_CPF, cri_Nasc, cri_Status, resp_Nome, nis_BPC,  dataEntrada, dataSaida, motivo, cri_Encaminhado, cri_Acompanhamento, cri_NmroAutos, usuario_sexo
    const sql = "insert into criancas (cri_nome, cri_RG, cri_CPF, cri_Nasc, cri_Status, resp_Nome, nis_BPC,  dataEntrada, dataSaida, motivo, cri_Encaminhado, cri_Acompanhamento, cri_NmroAutos, usuario_sexo) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    return await conexao.query(sql, [pessoa.nome, pessoa.idade, pessoa.cpf])
}

async function apagarPessoa(codigo)
{
    const conexao = await conectarBD()
    const sql = "delete from pessoas where id=?;"
    return await conexao.query(sql,[codigo])
}

async function recuperarPessoa(codigo)
{
    const conexao = await conectarBD()
    const sql = "select * from pessoas where id=?;"
    const [pessoa] = await conexao.query(sql,[codigo])
    return pessoa [0]
}

async function alterarPessoa(pessoa){
    const conexao = await conectarBD()
    const sql = "UPDATE pessoas SET pernome=?,peridade=?, percpf=? WHERE id=?;"
    return await conexao.query(sql,[pessoa.nome, pessoa.idade, pessoa.cpf, pessoa.id])
}

module.exports = { listarPessoas, inserirPessoa, apagarPessoa, recuperarPessoa, alterarPessoa }