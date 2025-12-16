import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { tema, pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ erro: 'Pergunta é obrigatória' });
    }

    try {
      await pool.query(
        'INSERT INTO perguntas (tema, pergunta) VALUES ($1, $2)',
        [tema, pergunta]
      );

      return res.status(201).json({ mensagem: 'Pergunta enviada com sucesso' });
    } catch (err) {
      return res.status(500).json({ erro: 'Erro no banco' });
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT * FROM perguntas ORDER BY data_envio DESC'
      );
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao buscar perguntas' });
    }
  }

  return res.status(405).json({ erro: 'Método não permitido' });
}