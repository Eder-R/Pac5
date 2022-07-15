var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  try {
    console.log('Amém!')
    const registros = await global.db.listarCadastros()
    res.render('index', { registros });
  } catch(err){
    res.redirect('/?erro='+err)
  }
});

router.get('/novoCadastro', function(req, res){
  res.render('formCadastro', { titulo:'Novo cadastro', acao:'/inserirInterno', interno:{}})
})

router.post('/novoCadastro', async function(req, res) {
  const nome = req.body.edtNome
  const sexo = req.body.edtSexo
  const rg = req.body.edtRg
  const cpf = req.body.edtCpf
  const nascimento = Date(req.body.edtNasc)
  const status = req.body.edtStats
  const responsavel = req.body.edtRespNome
  const bpc = req.body.edtBpc
  const entrada = Date(req.body.edtEntrada)
  const saida = Date(req.body.edtSaida)
  const motivo = req.body.edtMotivo
  const encaminhado = req.body.edtCaminhado
  const acompanhado = req.body.edtAcomp
  const autos = req.body.edtAutos

  await global.db.inserirPessoa({nome, sexo, rg, cpf, nascimento, status, responsavel, bpc, entrada, saida, motivo, encaminhado, acompanhado,autos})
  res.redirect('/')
} )

module.exports = router;
