from fastapi import FastAPI
import csv

app = FastAPI()

@app.get("/mobile/")
async def read_products():
    products = []
    with open("productdata.csv", mode="r", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            products.append(row)
    return products


