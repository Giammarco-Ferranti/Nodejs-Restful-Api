import chai from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import { createUser, deleteUser, getUser, updateUser } from "../src/controllers/users.js";
let expect = chai.expect;



describe("getUser test", () => {

it("get the user by the id", ()=>{

const req = {
  params: {
    id: new mongoose.Types.ObjectId(),
  }
};

const responseStatus = sinon.spy();

const res = {
  send: sinon.spy(),
  status: sinon.stub().returns({json: responseStatus})
}

const user = {data: "user data"}


it("should return status 200 and user data if found", async ()=>{
  sinon.stub(mongoose.Model, "findById").resolves(user)
  await getUser(req, res);
  expect(res.status).to.have.been.calledWith(200)
  expect(res.send).to.have.been.calledWith(user)
})

it("should return 400 if the req is not correct", async ()=>{
  sinon.stub(mongoose.Model, "findById").resolves(null)
  await getUser(req,res);
  expect(res.status).to.have.been.calledWith(400)
  expect(res.send).to.have.been.calledWith({message: "not valid id"})
})
});
});


describe("createUser test", ()=>{
it("create a user", ()=>{

  const req = {
    name: "John",
    surname: "Livio",
    email: "johnlivio@gmail.com"
  }

  const responseStatus = sinon.spy();

  const res = {
    send: sinon.spy(),
    status: sinon.stub().returns({json: responseStatus})
  }

  it("should return a status 200 if the user is created", async ()=>{

    sinon.stub(mongoose.Model, "save").resolves(req)
    await createUser(req, res)
    expect(res.status).to.be.calledWith(200)
    expect(res.send).to.have.been.calledWith({message: "user created"})

  });

  it("should return a status 400 if the user is not correct", async ()=>{

    sinon.stub(mongoose.Model, "save").resolves(null)
    await createUser(req, res)
    expect(res.status).to.be.calledWith(400)
    expect(res.send).to.have.been.calledWith({message: "the user is not correct"})


  });
})
});


describe("updateUser", ()=>{
  it("update the user information", ()=>{

    const req = {
      params: {
        id: new mongoose.Types.ObjectId(),
      },
      name: "Anna"
    }

    const responseStatus = sinon.spy();

    const res = {
      send: sinon.spy(),
      status: sinon.stub().returns({json: responseStatus})
    }

    it("should return a status 200 if the user is found and update", async ()=>{

      sinon.stub(mongoose.Model, "findByIdAndUpdate").resolves(req)
      await updateUser(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "user updated"})
    });

    it("should return a status 400 if the body is not correct", async ()=>{
      const req = {
        params: {
          id: new mongoose.Types.ObjectId(),
        },
        name: ""
      }
      await updateUser(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "user not updated"})
    });
  });
});


describe("deleteUser", ()=>{
  it("delete the user", ()=>{
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

    it("should return a 200 status if the user is found and deleted", async ()=>{
      sinon.stub(mongoose.Model, "findByIdAndDelete").resolves(req)
      await deleteUser(req, res)
      expect(res.status).to.be.calledWith(200)
      expect(res.send).to.have.been.calledWith({message: "user deleted"})
    });

    it("should return a 400 status if the user is not found", async ()=>{
      const req = {
        params: {
          id: "id"
        }
      }
      await deleteUser(req, res)
      expect(res.status).to.be.calledWith(400)
      expect(res.send).to.have.been.calledWith({message: "user not found"})

    });
  });
});