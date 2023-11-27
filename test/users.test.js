import chai from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import { getUser } from "../src/controllers/users.js";
let expect = chai.expect;

describe("user test", () => {

// it("", ()=>{

// const req = {
//   params: {
//     id: new mongoose.Types.ObjectId(),
//   }
// };

// const statusJsonSpy = sinon.spy();

// const res = {
//   send: sinon.spy(),
//   status: sinon.stub().returns({json: statusJsonSpy}),
// }

// const doc = {data: "user data"}
// const err = new Error("error")


// it("should return status 200 and user data if found", async ()=>{
//   sinon.stub(mongoose.Model, "findById").resolves(doc)
//   await getUser(req, res);
//   expect(res.status).to.have.been.calledWith(200)
//   expect(res.send).to.have.been.calledWith(doc)
// })

});

});