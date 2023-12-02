import chai from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import { getProduct,createProduct, updateProduct, deleteProduct } from "../controllers/products.js";
import { productModel } from "../models/products-schema.js";
let expect = chai.expect;


describe("getProduct", ()=>{
  it("should get a product", ()=>{

    const req = {
      params: {
        id: new mongoose.Types.ObjectId()
      }
    }

    const responseStatus = sinon.spy();

    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }


    const product = {
      product: "Product data"
    }

    it("should return 200 if the product is found", async ()=>{
      sinon.stub(productModel, "findById").resolves(product)
      await getProduct(req, res)
      expect(res.status).to.have.been.calledWith(200)
      expect(res.send).to.have.been.calledWith(product)

    });

    it("should return 400 if the product is not found", async ()=>{

      const invalidProduct = {
        product: "invalid product"
      }
      sinon.stub(productModel, "findById").resolves(null)
      await getProduct(req, res)
      expect(res.status).to.have.been.calledWith(400)
      expect(res.send).to.have.been.calledWith(invalidProduct)

    });
  });
});




describe("createProduct test", ()=>{
  it("create a product", ()=>{
  
    const req = {
      name: "Bike"
    }
  
    const responseStatus = sinon.spy();
  
    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }
  
    it("should return a status 200 if the product is created", async ()=>{
  
      sinon.stub(productModel, "save").resolves(req)
      await createProduct(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "product created"})
  
    });
  
    it("should return a status 400 if the product is not correct", async ()=>{
  
      sinon.stub(productModel, "save").resolves(null)
      await createProduct(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "the product is not correct"})
  
  
    });
  })
  });



describe("updateProduct test", ()=>{
  it("update the product information", ()=>{

    const req = {
      params: {
        id: new mongoose.Types.ObjectId(),
      },
      name: "Car"
    }

    const responseStatus = sinon.spy();

    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }

    it("should return a status 200 if the product is found and update", async ()=>{

      sinon.stub(productModel, "findByIdAndUpdate").resolves(req)
      await updateProduct(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "product updated"})
    });

    it("should return a status 400 if the body is not correct", async ()=>{
      const req = {
        params: {
          id: new mongoose.Types.ObjectId(),
        },
        name: ""
      }
      await updateProduct(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "product not updated"})
    });
  });
});


describe("deleteProduct", ()=>{
  it("delete the product", ()=>{
    const req = {
      params: {
        id: new mongoose.Types.ObjectId(),
      }
    }

    const responseStatus = sinon.spy();

    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }

    it("should return a 200 status if the product is found and deleted", async ()=>{
      sinon.stub(productModel, "findByIdAndDelete").resolves(req)
      await deleteProduct(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "product deleted"})
    });

    it("should return a 400 status if the product is not found", async ()=>{
      const req = {
        params: {
          id: "id"
        }
      }
      await deleteProduct(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "product not found"})

    });
  });
});