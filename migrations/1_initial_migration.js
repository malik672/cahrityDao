const Charity = artifacts.require("Charity");
const Token = artifacts.require("Token")

module.exports = async function (deployer) {

    // const token = await deployer.deploy(Token);

     await  deployer.deploy(Charity, "0x00D4ba5B41961BCE6D33df0B65876Ca968F1c07c");
};
