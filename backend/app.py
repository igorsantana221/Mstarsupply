#C:\flask_dev\flaskreact\app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow #ModuleNotFoundError: No module named 'flask_marshmallow' = pip install flask-marshmallow https://pypi.org/project/flask-marshmallow/
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
 
app = Flask(__name__)
CORS(app)

 
# Databse configuration                       
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///logistica.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
 
ma=Marshmallow(app)
 
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mstarsupply.db'
db = SQLAlchemy(app)

class Mercadoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    numero_registro = db.Column(db.String(50), nullable=False)
    fabricante = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(255), nullable=False)
    
    def __init__(self,nome,numero_registro, fabricante, tipo, descricao):
        self.nome=nome
        self.numero_registro=numero_registro
        self.fabricante=fabricante
        self.tipo=tipo
        self.descricao=descricao

class Entrada(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, default=datetime.datetime.now)
    local = db.Column(db.String(100), unique=True )
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadoria.id'), nullable=False)
    mercadoria = db.relationship('Mercadoria', backref=db.backref('entradas', lazy=True))
        

class Saida(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, default=datetime.datetime.now)
    local = db.Column(db.String(100), unique=True )
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadoria.id'), nullable=False)
    mercadoria = db.relationship('Mercadoria', backref=db.backref('saidas', lazy=True))

#=============================================================================================#


@app.route('/mercadorias', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def cadastrar_mercadoria():
    name = request.json['name']
    numero_registro = request.json ['numero_registro']
    fabricante = request.json ['fabricante']
    tipo = request.json ['tipo']
    descrição = request.json ['descricao']
    
    nova_mercadoria = Mercadoria(name, numero_registro, fabricante, tipo, descrição)
    db.session.add(nova_mercadoria)
    db.session.commit()
    return jsonify({"message": "Mercadoria cadastrada com sucesso"}), 201

@app.route('/mercadorias', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def listar_mercadorias():
    mercadorias = Mercadoria.query.all()
    return jsonify([{"id": m.id, "nome": m.nome, "tipo": m.tipo} for m in mercadorias])


# Rota para cadastrar uma nova entrada de mercadoria
@app.route('/entradas', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def cadastrar_entrada():
    data = request.get_json()
    mercadoria_id = data.get('mercadoria_id')

    if not Mercadoria.query.get(mercadoria_id):
        return jsonify({"error": "Mercadoria não encontrada"}), 404

    nova_entrada = Entrada(
        quantidade=data['quantidade'],
        local=data['local'],
        mercadoria_id=mercadoria_id
    )

    db.session.add(nova_entrada)
    db.session.commit()
    
    return jsonify({"message": "Entrada cadastrada com sucesso"}), 201

@app.route('/entradas', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def listar_entradas():
    entradas = Entrada.query.all()
    return jsonify([{
        "id": e.id,
        "quantidade": e.quantidade,
        "data_hora": e.data_hora.strftime('%Y-%m-%d %H:%M:%S'),
        "local": e.local,
        "mercadoria": {
            "id": e.mercadoria.id,
            "nome": e.mercadoria.nome,
            "tipo": e.mercadoria.tipo
        }
    } for e in entradas])
    
@app.route('/saidas', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def cadastrar_saida():
    data = request.get_json()
    mercadoria_id = data.get('mercadoria_id')

    if not Mercadoria.query.get(mercadoria_id):
        return jsonify({"error": "Mercadoria não encontrada"}), 404

    nova_saida = Saida(
        quantidade=data['quantidade'],
        local=data['local'],
        mercadoria_id=mercadoria_id
    )

    db.session.add(nova_saida)
    db.session.commit()
    
    return jsonify({"message": "Saída cadastrada com sucesso"}), 201   

# Rota para listar todas as saídas
@app.route('/saidas', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def listar_saidas():
    saidas = Saida.query.all()
    return jsonify([{
        "id": s.id,
        "quantidade": s.quantidade,
        "data_hora": s.data_hora.strftime('%Y-%m-%d %H:%M:%S'),
        "local": s.local,
        "mercadoria": {
            "id": s.mercadoria.id,
            "nome": s.mercadoria.nome,
            "tipo": s.mercadoria.tipo
        }
    } for s in saidas])

# Rota para listar entradas por mês
@app.route('/entradas/mes/<int:ano>/<int:mes>', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def listar_entradas_por_mes(ano, mes):
    entradas = Entrada.query.filter(
        db.extract('year', Entrada.data_hora) == ano,
        db.extract('month', Entrada.data_hora) == mes
    ).all()

    return jsonify([{
        "id": e.id,
        "quantidade": e.quantidade,
        "data_hora": e.data_hora.strftime('%Y-%m-%d %H:%M:%S'),
        "local": e.local,
        "mercadoria": {
            "id": e.mercadoria.id,
            "nome": e.mercadoria.nome,
            "tipo": e.mercadoria.tipo
        }
    } for e in entradas])

# Rota para listar saídas por mês
@app.route('/saidas/mes/<int:ano>/<int:mes>', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def listar_saidas_por_mes(ano, mes):
    saidas = Saida.query.filter(
        db.extract('year', Saida.data_hora) == ano,
        db.extract('month', Saida.data_hora) == mes
    ).all()

    return jsonify([{
        "id": s.id,
        "quantidade": s.quantidade,
        "data_hora": s.data_hora.strftime('%Y-%m-%d %H:%M:%S'),
        "local": s.local,
        "mercadoria": {
            "id": s.mercadoria.id,
            "nome": s.mercadoria.nome,
            "tipo": s.mercadoria.tipo
        }
    } for s in saidas])

 
if __name__=='__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)