from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine('sqlite:///clients.db')
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


class Clients(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(String, nullable=False)

    def to_string(self):
        return f"Клиент: {self.name} | Почта: {self.email} | Сообщение: {self.message}"


def create_database_tables():
    connection = engine.connect()
    if not engine.dialect.has_table(connection, Clients.__tablename__):
        Base.metadata.create_all(engine)
    connection.close()


def add_client_to_db(name, email, message):
    new_item = Clients(name=name, email=email, message=message)
    session.add(new_item)
    try:
        session.commit()
        return True
    except Exception as e:
        session.rollback()
        return str(e)
