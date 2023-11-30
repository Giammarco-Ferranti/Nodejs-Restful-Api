import chai from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
let expect = chai.expect;


describe("getProducts", ()=>{
  it("should get all the products", ()=>{

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
      sinon.stub(mongoose.model, "findById").resolves(product)
      await getProducts(req, res)
      expect(res.status).to.have.been.calledWith(200)
      expect(res.send).to.have.been.calledWith(product)

    });

    it("should return 400 if the product is not found", async ()=>{

      const invalidProduct = {
        product: "invalid product"
      }
      sinon.stub(mongoose.model, "findById").resolves(null)
      await getProducts(req, res)
      expect(res.status).to.have.been.calledWith(400)
      expect(res.send).to.have.been.calledWith(invalidProduct)

    });
  });
});
