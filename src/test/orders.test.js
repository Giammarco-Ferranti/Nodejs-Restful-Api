import chai from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import { getOrder, createOrder, updateOrder, deleteOrder } from "../controllers/orders.js"
import { ordersModel } from "../models/orders-schema.js";
let expect = chai.expect;



describe("getOrder", ()=>{
  it("should get an order", ()=>{

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


    const order = {
      product: "Product data",
      user: "User data"
    }

    it("should return 200 if the order is found", async ()=>{
      sinon.stub(ordersModel, "findById").resolves(order)
      await getOrder(req, res)
      expect(res.status).to.have.been.calledWith(200)
      expect(res.send).to.have.been.calledWith(order)

    });

    it("should return 400 if the order is not found", async ()=>{

      const invalidOrder = {
        order: "invalid order"
      }
      sinon.stub(ordersModel, "findById").resolves(null)
      await getOrder(req, res)
      expect(res.status).to.have.been.calledWith(400)
      expect(res.send).to.have.been.calledWith(invalidOrder)

    });
  });
});




describe("createOrder test", ()=>{
  it("create an order", ()=>{
  
    const req = {
      product: "Product data",
      user: "User data"
    }
  
    const responseStatus = sinon.spy();
  
    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }
  
    it("should return a status 200 if the order is created", async ()=>{
  
      sinon.stub(ordersModel, "save").resolves(req)
      await createOrder(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "order created"})
  
    });
  
    it("should return a status 400 if the order is not correct", async ()=>{
  
      sinon.stub(ordersModel, "save").resolves(null)
      await createOrder(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "the order is not correct"})
  
  
    });
  })
  });



describe("updateOrder test", ()=>{
  it("update the order information", ()=>{

    const req = {
      params: {
        id: new mongoose.Types.ObjectId(),
      },
      product: "Product data"
    }

    const responseStatus = sinon.spy();

    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }

    it("should return a status 200 if the order is found and update", async ()=>{

      sinon.stub(ordersModel, "findByIdAndUpdate").resolves(req)
      await updateOrder(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "order updated"})
    });

    it("should return a status 400 if the body is not correct", async ()=>{
      const req = {
        params: {
          id: new mongoose.Types.ObjectId(),
        },
        product: ""
      }
      await updateOrder(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "order not updated"})
    });
  });
});


describe("deleteOrder", ()=>{
  it("delete the order", ()=>{
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

    it("should return a 200 status if the order is found and deleted", async ()=>{
      sinon.stub(ordersModel, "findByIdAndDelete").resolves(req)
      await deleteOrder(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "order deleted"})
    });

    it("should return a 400 status if the order is not found", async ()=>{
      const req = {
        params: {
          id: "id"
        }
      }
      await deleteOrder(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "order not found"})

    });
  });
});