import os
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import User, Product
from app.models.page import Page
from passlib.hash import bcrypt

Base.metadata.create_all(bind=engine)

def seed():
    db: Session = SessionLocal()
    db.query(User).delete()
    db.query(Product).delete()
    db.query(Page).delete()

    admin = User(email="admin@bbg.com", password=bcrypt.hash("adminpass"), name="Admin", role="admin")
    seller = User(email="seller@bbg.com", password=bcrypt.hash("sellerpass"), name="Seller", role="seller")
    buyer = User(email="buyer@bbg.com", password=bcrypt.hash("buyerpass"), name="Buyer", role="buyer")
    db.add_all([admin, seller, buyer])
    db.commit()

    products = [
        Product(name="Luxury Wooden Monopoly Board", price=799.99, description="Premium board", seller_id=seller.id),
        Product(name="Super Rubik's Cube", price=149.99, description="Challenging cube", seller_id=seller.id),
        Product(name="Chess Set", price=99.99, description="Classic chess set", seller_id=seller.id),
        Product(name="Go Board", price=129.99, description="Strategic Go board", seller_id=seller.id),
        Product(name="Catan", price=59.99, description="Popular strategy game", seller_id=seller.id),
    ]
    db.add_all(products)
    db.commit()

    homepage = Page(slug="homepage", title="Welcome to BoredBoardGames!", content="<h1>Board Games for Everyone!</h1>", is_published=True)
    about = Page(slug="about", title="About Us", content="<p>We love board games.</p>", is_published=True)
    db.add_all([homepage, about])
    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
