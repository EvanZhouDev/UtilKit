let len = (str) => {
	str.replaceAll("\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])","");
	return [...str].length
}

module.exports = function () {
	this.len = str => len(str)
	//etc
};
